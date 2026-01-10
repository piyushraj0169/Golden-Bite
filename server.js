// server.js (ESM)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Razorpay from "razorpay";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


dotenv.config();





const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // MUST be false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000, // 10s
  greetingTimeout: 10000,
  socketTimeout: 10000,
});


try {
  await transporter.verify();
  console.log("✅ SMTP verified");
} catch (err) {
  console.warn("⚠️ SMTP verify skipped:", err.message);
}



/* ---------- middleware ---------- */
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

  const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);




// AUTH ROUTES
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });
  res.json({ message: "Registered successfully" });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user: { name: user.name, email: user.email } });
});




// static files
app.use(express.static(path.join(__dirname, "public")));
const invoicesDir = path.join(__dirname, "invoices");
if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir);
app.use("/invoices", express.static(invoicesDir));

/* ---------- razorpay ---------- */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------- tiny file “db” ---------- */
const dataFile = path.join(__dirname, "order.json");
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]");
const readData  = () => JSON.parse(fs.readFileSync(dataFile, "utf8"));
const writeData = (d) => fs.writeFileSync(dataFile, JSON.stringify(d, null, 2));

/* ---------- email ---------- */
/* ---------- email (Gmail App Password) ---------- */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.SMTP_USER,   // your Gmail
//     pass: process.env.SMTP_PASS,   // 16-char App Password
//   },
// });

// transporter.verify((err) => {
//   if (err) console.error("✖ SMTP error:", err);
//   else console.log("✔ Gmail SMTP ready");
// });


/* ---------- generate invoice PDF ---------- */

function generateInvoicePDF({ order, payment, customer, items, total }) {
  const fileName = `${order.id}.pdf`;
  const filePath = path.join(invoicesDir, fileName);

  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  /* ---------- HEADER SECTION ---------- */
  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .text("GoldenBite", { align: "left" });

  doc
    .moveDown(0.2)
    .fontSize(10)
    .font("Helvetica")
    .text("GoldenBite Pvt. Ltd.")
    .text("Begusarai, Bihar, India")
    .text("support@goldenbite.com")
    .moveDown(1);

  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("TAX INVOICE", { align: "center" })

    .moveDown(1);

  /* ---------- ORDER META ---------- */
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Order ID: ${order.id}`)
    .text(`Payment ID: ${payment?.razorpay_payment_id || "-"}`)
    .text(`Date: ${new Date().toLocaleString()}`)
    .moveDown(1);

  /* ---------- CUSTOMER BILLING ---------- */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Bill To:")
    .moveDown(0.4);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`${customer.firstName} ${customer.lastName}`)
    .text(customer.phone)
    .text(customer.email)
    .text(`${customer.address}, ${customer.city}`)
    .text(`${customer.state} - ${customer.zip}`)
    .text(customer.country)
    .moveDown(2);

  /* ---------- TABLE HEADER ---------- */
  const tableTop = doc.y;

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Item", 40, tableTop)
    .text("Qty", 270, tableTop)
    .text("Price", 330, tableTop)
    .text("Amount", 420, tableTop);

  doc
    .moveDown(0.3)
    .moveTo(40, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  /* ---------- TABLE BODY ---------- */
  doc.font("Helvetica").fontSize(10);

  items.forEach((it, i) => {
    const y = tableTop + 25 + i * 20;
    doc.text(it.title, 40, y);
    doc.text(String(it.qty), 270,y);
    doc.text(`Rs ${it.price}`, 330,y);
    doc.text(`Rs ${it.price * it.qty}`, 420, y);
  });

  /* ---------- TOTAL ---------- */
  const totalTop = tableTop + 25 + items.length * 20 + 20;

  doc
    .moveTo(40, totalTop)
    .lineTo(550, totalTop)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`Total:  Rs ${total}`, 420, totalTop + 10);

  /* ---------- FOOTER ---------- */
  doc
    .moveDown(4)
    .font("Helvetica-Oblique")
    .fontSize(10)
    .text("Thank you for your purchase!", { align: "center" });

  doc.end();
  return new Promise((resolve) => stream.on("finish", () => resolve({ filePath, fileName })));
}


/* ---------- routes ---------- */

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Login required" });
  }

  // ✅ FIX: remove "Bearer "
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// get orders for logged-in user
app.get("/my-orders", authMiddleware, (req, res) => {
  const orders = readData();

  const userOrders = orders.filter(
    (o) => o.userId === req.user.id
  );

  res.json(userOrders);
});


// create order
app.post("/create-order",authMiddleware, async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1", notes = {}, customer, items } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const rpOrder = await razorpay.orders.create({ amount: amount * 100, currency, receipt, notes });

    const orders = readData();
    // orders.push({
    //   order_id: rpOrder.id,
    //   amount: rpOrder.amount,
    //   currency: rpOrder.currency,
    //   status: rpOrder.status,        // created
    //   created_at: rpOrder.created_at,
    //   customer,                       // store what frontend sent
    //   items
    // });
    orders.push({
       order_id: rpOrder.id,
       userId: req.user.id,   // 🔥 LINK ORDER TO USER
       amount: rpOrder.amount,
       currency: rpOrder.currency,
       status: rpOrder.status,
       created_at: rpOrder.created_at,
       customer,
       items,
   });

    writeData(orders);

    res.json({ order: rpOrder, key: process.env.RAZORPAY_KEY_ID });
  } catch (e) {
    console.error("create-order error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// verify, invoice, email
app.post("/verify-payment",authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer: bodyCustomer, items: bodyItems } = req.body;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ status: "failure", message: "Invalid signature" });
    }

    // update order + get saved info
    const orders = readData();
    const idx = orders.findIndex((o) => o.order_id === razorpay_order_id);
    if (idx !== -1) {
      orders[idx].status = "paid";
      orders[idx].payment_id = razorpay_payment_id;
      // keep most complete details (saved or from body)
      orders[idx].customer = bodyCustomer ?? orders[idx].customer ?? {};
      orders[idx].items    = bodyItems ?? orders[idx].items ?? [];
      writeData(orders);
    }

    const row   = orders.find((o) => o.order_id === razorpay_order_id);
    const total = (row?.amount || 0) / 100;
    const customer = row?.customer || bodyCustomer || {};
    const items    = row?.items || bodyItems || [];

    const { filePath, fileName } = await generateInvoicePDF({
      order: { id: razorpay_order_id },
      payment: { razorpay_payment_id },
      customer,
      items,
      total,
    } );

// send email with invoice



 if (customer?.email) {
  console.log("📨 Sending Order Confirmation to:", customer.email);

  const mailOptions = {
    from: `GoldenBite <${process.env.SMTP_USER}>`,
    to: customer.email,
    subject: `✅ Order Confirmed - ${razorpay_order_id}`,
    html: `
      <h2>Thank you for your order, ${customer.firstName}!</h2>
      <p>Your order has been successfully placed and paid.</p>

      <h3>Delivery Information:</h3>
      <p>
        ${customer.firstName} ${customer.lastName}<br>
        ${customer.address}, ${customer.city}, ${customer.state} - ${customer.zip}<br>
        ${customer.country}<br>
        Phone: ${customer.phone}
      </p>

      <h3>Total Paid: ₹${total}</h3>

      <p>Your invoice is attached. You can download it anytime:</p>
      <a href="${req.protocol}://${req.get("host")}/invoices/${fileName}">Download Invoice</a>

      <br><br>
      <strong>GoldenBite</strong>
    `,
    attachments: [{ filename: fileName, path: filePath }]
  };

  transporter.sendMail(mailOptions).then(() =>
    console.log("✅ Email Sent Successfully")
  ).catch(err =>
    console.error("❌ Email Error:", err)
  );
} else {
  console.warn("❗ Customer email missing, email not sent.");
}



    res.status(200).json({
      status: "success",
      message: "Payment verified",
      invoiceUrl: `/invoices/${fileName}`,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      total,
    });
  } catch (e) {
    console.error("verify-payment error:", e);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

/* optional success/failure pages (if you decide to redirect there) */
app.get("/payment-success", (_req, res) =>
  res.sendFile(path.join(__dirname, "public", "success.html"))
);
app.get("/payment-failure", (_req, res) =>
  res.sendFile(path.join(__dirname, "public", "failure.html"))
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
















