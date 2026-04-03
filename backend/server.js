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
import http from "http";
import { initSocket, getIO } from "./socket.js";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./models/User.js";
import Order from "./models/Order.js";
import FoodItem from "./models/FoodItem.js";
import adminRoutes from "./routes/adminRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports like 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));


// Helper to build a safe user object for responses
const safeUser = (u) => ({
  name: u.name, email: u.email, phone: u.phone || "",
  address: u.address || "", city: u.city || "",
  state: u.state || "", zip: u.zip || "", country: u.country || "",
  role: u.role || 'user',
});

// In-memory OTP store (email -> { otp, expiresAt })
const otpStore = {};



// PUBLIC ROUTES
app.get("/api/menu", async (req, res) => {
  try {
    const menu = await FoodItem.find({});
    res.json(menu);
  } catch(err) {
    res.status(500).json({ message: "Failed to load public menu" });
  }
});

// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// AUTH ROUTES
app.post("/auth/send-otp", async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "User with this email already exists" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  };

  const mailOptions = {
    from: process.env.SMTP_FROM || `"GoldenBite Security" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your GoldenBite Registration OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333 text-align: center;">
        <h2 style="color: #d4af37;">GoldenBite Verification</h2>
        <p>Hello ${name || "User"},</p>
        <p>Thank you for registering with GoldenBite! To complete your registration, please use the following One-Time Password (OTP):</p>
        <div style="margin: 20px auto; padding: 15px; background: #fdfaf2; border: 2px dashed #d4af37; font-size: 28px; font-weight: bold; letter-spacing: 4px; display: inline-block;">
          ${otp}
        </div>
        <p style="color: #666; font-size: 14px;">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    res.status(500).json({ message: "Failed to send OTP via email" });
  }
});

app.post("/auth/register", async (req, res) => {
  const { name, email, phone, password, otp } = req.body;

  if (!otp) return res.status(400).json({ message: "OTP is required" });

  const record = otpStore[email];
  if (!record) return res.status(400).json({ message: "No OTP found for this email. Please request a new one." });

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP has expired. Please request a new one." });
  }

  if (record.otp !== otp.toString().trim()) {
    return res.status(400).json({ message: "Invalid OTP provided." });
  }

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, phone, password: hashed });

  // Clear OTP
  delete otpStore[email];

  // Auto-login user after successful registration
  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Registered successfully",
    token,
    user: safeUser(newUser),
  });
});

app.post("/auth/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  if (user.isBlocked) return res.status(403).json({ message: "User is blocked" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const expiresIn = rememberMe ? "15d" : "1d";
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn }
  );

  res.json({ token, user: safeUser(user) });
});

// ===== OTP LOGIN =====
app.post("/auth/send-login-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "No account found with this email" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[`login_${email}`] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"GoldenBite" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your GoldenBite Login OTP",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;text-align:center;">
          <h2 style="color:#d4af37;">GoldenBite Login</h2>
          <p>Hello ${user.name},</p>
          <p>Use this OTP to log in to your account:</p>
          <div style="margin:20px auto;padding:15px;background:#fdfaf2;border:2px dashed #d4af37;font-size:28px;font-weight:bold;letter-spacing:4px;display:inline-block;">${otp}</div>
          <p style="color:#666;font-size:14px;">Valid for 10 minutes. Do not share.</p>
        </div>
      `,
    });
    res.json({ message: "Login OTP sent to your email" });
  } catch (err) {
    console.error("Login OTP email error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

app.post("/auth/verify-login-otp", async (req, res) => {
  const { email, otp, rememberMe } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  const record = otpStore[`login_${email}`];
  if (!record) return res.status(400).json({ message: "No OTP found. Please request a new one." });

  if (Date.now() > record.expiresAt) {
    delete otpStore[`login_${email}`];
    return res.status(400).json({ message: "OTP expired. Please request a new one." });
  }

  if (record.otp !== otp.toString().trim()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[`login_${email}`];

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.isBlocked) return res.status(403).json({ message: "User is blocked" });

  const expiresIn = rememberMe ? "15d" : "1d";
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn });
  res.json({ token, user: safeUser(user) });
});

// ===== FORGOT PASSWORD =====
app.post("/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "No account found with this email" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[`reset_${email}`] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"GoldenBite" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "GoldenBite Password Reset OTP",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;text-align:center;">
          <h2 style="color:#d4af37;">Password Reset</h2>
          <p>Hello ${user.name},</p>
          <p>Use this OTP to reset your password:</p>
          <div style="margin:20px auto;padding:15px;background:#fdfaf2;border:2px dashed #d4af37;font-size:28px;font-weight:bold;letter-spacing:4px;display:inline-block;">${otp}</div>
          <p style="color:#666;font-size:14px;">Valid for 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });
    res.json({ message: "Password reset OTP sent to your email" });
  } catch (err) {
    console.error("Reset OTP email error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

app.post("/auth/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) return res.status(400).json({ message: "All fields are required" });

  if (newPassword.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

  const record = otpStore[`reset_${email}`];
  if (!record) return res.status(400).json({ message: "No OTP found. Please request a new one." });

  if (Date.now() > record.expiresAt) {
    delete otpStore[`reset_${email}`];
    return res.status(400).json({ message: "OTP expired. Please request a new one." });
  }

  if (record.otp !== otp.toString().trim()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[`reset_${email}`];

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });

  res.json({ message: "Password reset successfully. You can now login." });
});



// static files - Serve frontend dist if it exists (useful for deployment)
const frontendDist = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}

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
const readData = () => JSON.parse(fs.readFileSync(dataFile, "utf8"));
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
    doc.text(String(it.qty), 270, y);
    doc.text(`Rs ${it.price}`, 330, y);
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

// Update user profile
app.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, city, state, zip, country } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, city, state, zip, country },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ user: safeUser(updated) });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});



// get orders for logged-in user
app.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("my-orders error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// create order
app.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1", notes = {}, customer, items } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const rpOrder = await razorpay.orders.create({ amount: amount * 100, currency, receipt, notes });

    await Order.create({
      order_id: rpOrder.id,
      userId: req.user.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      status: rpOrder.status,
      created_at: rpOrder.created_at,
      customer,
      items,
    });

    res.json({ order: rpOrder, key: process.env.RAZORPAY_KEY_ID });
  } catch (e) {
    console.error("create-order error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// verify, invoice, email
app.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer: bodyCustomer, items: bodyItems } = req.body;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ status: "failure", message: "Invalid signature" });
    }

    // update order in MongoDB
    const order = await Order.findOne({ order_id: razorpay_order_id });
    if (order) {
      order.status = "paid";
      order.payment_id = razorpay_payment_id;
      if (bodyCustomer) order.customer = bodyCustomer;
      if (bodyItems) order.items = bodyItems;
      await order.save();
    }

    const total = (order?.amount || 0) / 100;
    const customer = order?.customer || bodyCustomer || {};
    const items = order?.items || bodyItems || [];

    // Emitting realtime notification to Admin Dashboards
    try {
      const io = getIO();
      if (io) {
        io.emit('new_order', {
          _id: order?._id || new Date().getTime(),
          order_id: razorpay_order_id,
          customerName: customer?.firstName || 'Guest',
          amount: total,
          createdAt: order?.createdAt || new Date()
        });
      }
    } catch (socketErr) {
      console.error("Socket emission failed:", socketErr);
    }

    const { filePath, fileName } = await generateInvoicePDF({
      order: { id: razorpay_order_id },
      payment: { razorpay_payment_id },
      customer,
      items,
      total,
    });

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
  res.sendFile(path.join(__dirname, "../frontend/public", "success.html"))
);
app.get("/payment-failure", (_req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/public", "failure.html"))
);

app.use((err, req, res, next) => {
  console.error("Global Express Error:", err);
  import('fs').then(fs => fs.writeFileSync('last_express_error.txt', String(err.stack)));
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const httpServer = http.createServer(app);
initSocket(httpServer);

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT} with Socket.io`));
















