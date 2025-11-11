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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3000;

/* ---------- middleware ---------- */
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,   // your Gmail
    pass: process.env.SMTP_PASS,   // 16-char App Password
  },
});

transporter.verify((err, success) => {
  if (err) console.error("✖ SMTP error:", err);
  else console.log("✔ Gmail SMTP ready");
});


/* ---------- utils: invoice pdf ---------- */
// function generateInvoicePDF({ order, payment, customer, items, total }) {
//   const fileName = `${order.id}.pdf`;
//   const filePath = path.join(invoicesDir, fileName);

//   const doc = new PDFDocument({ size: "A4", margin: 50 });
//   const out = fs.createWriteStream(filePath);
//   doc.pipe(out);

//   doc.fontSize(18).text("GoldenBite - Tax Invoice");
//   doc.moveDown(0.5);
//   doc.fontSize(10)
//     .text(`Order ID: ${order.id}`)
//     .text(`Payment ID: ${payment?.razorpay_payment_id || "-"}`)
//     .text(`Date: ${new Date().toLocaleString()}`);
//   doc.moveDown();

//   doc.fontSize(12).text("Bill To:");
//   doc.fontSize(10)
//     .text(`${customer.firstName} ${customer.lastName}`)
//     .text(`${customer.phone}`)
//     .text(`${customer.email}`)
//     .text(`${customer.address}, ${customer.city}, ${customer.state} - ${customer.zip}`)
//     .text(`${customer.country}`);
//   doc.moveDown();

//   doc.fontSize(12).text("Order Details:");
//   doc.moveDown(0.5);
//   doc.fontSize(10);

//   const top = doc.y;
//   const col = (x) => 50 + x;
//   const row = (i) => top + i * 20;
//   doc.text("Title",  col(0),   row(0));
//   doc.text("Qty",    col(280), row(0));
//   doc.text("Price",  col(330), row(0));
//   doc.text("Amount", col(400), row(0));

//   items.forEach((it, i) => {
//     const y = row(i + 1);
//     doc.text(it.title, col(0),   y);
//     doc.text(String(it.qty), col(280), y);
//     doc.text(String(it.price), col(330), y);
//     doc.text(String(it.price * it.qty), col(400), y);
//   });

//   doc.moveDown(2);
//   doc.fontSize(12).text(`Total: ₹ ${total}`, { align: "right" });
//   doc.moveDown(2);
//   doc.fontSize(9).text("Thank you for your purchase!", { align: "center" });
//   doc.end();

//   return new Promise((resolve) => out.on("finish", () => resolve({ filePath, fileName })));
// }

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

// create order
app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1", notes = {}, customer, items } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const rpOrder = await razorpay.orders.create({ amount: amount * 100, currency, receipt, notes });

    const orders = readData();
    orders.push({
      order_id: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      status: rpOrder.status,        // created
      created_at: rpOrder.created_at,
      customer,                       // store what frontend sent
      items
    });
    writeData(orders);

    res.json({ order: rpOrder, key: process.env.RAZORPAY_KEY_ID });
  } catch (e) {
    console.error("create-order error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// verify, invoice, email
app.post("/verify-payment", async (req, res) => {
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
    });

    // send email (log errors if any)
    // if (customer?.email) {
    //   try {
    //     const info = await transporter.sendMail({
    //       from: process.env.MAIL_FROM,
    //       to: customer.email,
    //       subject: `Order Confirmed - ${razorpay_order_id}`,
    //       text: `Hi ${customer.firstName || ""},
    //            Your payment was successful.

    //            Order ID: ${razorpay_order_id}
    //              Payment ID: ${razorpay_payment_id}
    //               Total: ₹${total}

    //                 Invoice attached.

    //                  — GoldenBite`,
    //              attachments: [{ filename: fileName, path: filePath }],
    //     });
    //     console.log("✔ Mail sent:", info.messageId);
    //   } catch (mailErr) {
    //     console.error("✖ sendMail error:", mailErr);
    //   }
    // } else {
    //   console.warn("No customer email; skip email.");
    // }

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




















// import express from "express";
// import bodyParser from "body-parser";
// import Razorpay from "razorpay";
// import path from "path";
// import fs from "fs";
// import crypto from "crypto";

// import PDFDocument from "pdfkit";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const cors = require("cors");
// app.use(cors());


// const app = express();
// const PORT = process.env.PORT || 3000;

// // --- Middleware
// app.use(cors({ origin: true, credentials: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // serve static pages & invoices
// const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/^\/+([A-Za-z]:)/, '$1'));
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/invoices", express.static(path.join(__dirname, "invoices")));

// if (!fs.existsSync(path.join(__dirname, "invoices"))) fs.mkdirSync(path.join(__dirname, "invoices"));

// // --- Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // --- Simple file store for created orders (demo)
// const dataFile = path.join(__dirname, "order.json");
// if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]");
// const readData = () => JSON.parse(fs.readFileSync(dataFile));
// const writeData = (d) => fs.writeFileSync(dataFile, JSON.stringify(d, null, 2));

// // --- Email transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: process.env.SMTP_SECURE === "true",
//   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
// });

// // UTIL: create invoice PDF and return file path
// function generateInvoicePDF({ order, payment, customer, items, total }) {
//   const fileName = `${order.id}.pdf`;
//   const filePath = path.join(__dirname, "invoices", fileName);

//   const doc = new PDFDocument({ size: "A4", margin: 50 });
//   const stream = fs.createWriteStream(filePath);
//   doc.pipe(stream);

//   // Header
//   doc.fontSize(20).text("GoldenBite - Tax Invoice", { align: "left" });
//   doc.moveDown(0.5);
//   doc.fontSize(10).text(`Order ID: ${order.id}`);
//   doc.text(`Payment ID: ${payment?.razorpay_payment_id || "-"}`);
//   doc.text(`Date: ${new Date().toLocaleString()}`);
//   doc.moveDown();

//   // Customer
//   doc.fontSize(12).text("Bill To:");
//   doc.fontSize(10).text(`${customer.firstName} ${customer.lastName}`);
//   doc.text(`${customer.phone}`);
//   doc.text(`${customer.email}`);
//   doc.text(`${customer.address}, ${customer.city}, ${customer.state} - ${customer.zip}`);
//   doc.text(`${customer.country}`);
//   doc.moveDown();

//   // Items table
//   doc.fontSize(12).text("Order Details:");
//   doc.moveDown(0.5);
//   doc.fontSize(10);

//   const tableTop = doc.y;
//   const col = (x) => 50 + x;
//   const row = (y) => tableTop + y;

//   doc.text("Title", col(0), row(0));
//   doc.text("Qty", col(280), row(0));
//   doc.text("Price", col(330), row(0));
//   doc.text("Amount", col(400), row(0));

//   let i = 1;
//   items.forEach((it) => {
//     const y = row(i * 20);
//     doc.text(it.title, col(0), y);
//     doc.text(it.qty.toString(), col(280), y);
//     doc.text(`${it.price}`, col(330), y);
//     doc.text(`${it.price * it.qty}`, col(400), y);
//     i++;
//   });

//   doc.moveDown(2);
//   doc.fontSize(12).text(`Total: ₹ ${total}`, { align: "right" });

//   doc.moveDown(2);
//   doc.fontSize(9).text("Thank you for your purchase!", { align: "center" });

//   doc.end();

//   return new Promise((resolve) => {
//     stream.on("finish", () => resolve({ filePath, fileName }));
//   });
// }

// // --- Create Razorpay order
// app.post("/create-order", async (req, res) => {
//   try {
//     const { amount, currency = "INR", receipt = "receipt#1", notes = {}, customer, items } = req.body;

//     if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

//     const options = { amount: amount * 100, currency, receipt, notes };
//     const order = await razorpay.orders.create(options);

//     const orders = readData();
//     orders.push({ order_id: order.id, amount: order.amount, currency: order.currency, status: order.status, created_at: order.created_at, customer, items });
//     writeData(orders);

//     res.json({ order, key: process.env.RAZORPAY_KEY_ID });
//   } catch (e) {
//     console.error("create-order error:", e);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // --- Verify payment, generate invoice, send email
// // const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer, items } = req.body;

// app.post("/verify-payment", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer, items } = req.body;

//     const secret = process.env.RAZORPAY_KEY_SECRET;
//     const expected = crypto
//       .createHmac("sha256", secret)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (expected !== razorpay_signature) {
//       return res.status(400).json({ status: "failure", message: "Invalid signature" });
//     }

//     // ✅ Update stored order + store customer & items
//     const orders = readData();
//     const idx = orders.findIndex((o) => o.order_id === razorpay_order_id);
//     if (idx !== -1) {
//       orders[idx].status = "paid";
//       orders[idx].payment_id = razorpay_payment_id;
//       orders[idx].customer = customer; // ✅ Save customer details
//       orders[idx].items = items;       // ✅ Save ordered items
//       writeData(orders);
//     }

//     const orderRow = orders.find((o) => o.order_id === razorpay_order_id);
//     const total = (orderRow.amount || 0) / 100;

//     // ✅ Generate Invoice PDF now with REAL details
//     const { filePath, fileName } = await generateInvoicePDF({
//       order: { id: razorpay_order_id },
//       payment: { razorpay_payment_id },
//       customer,
//       items,
//       total,
//     });

//     // ✅ Send Confirmation Email with Invoice
//     if (customer?.email) {
//       await transporter.sendMail({
//         from: process.env.MAIL_FROM,
//         to: customer.email,
//         subject: `Order Confirmed - ${razorpay_order_id}`,
//         text: `Hi ${customer.firstName},\n\nThank you for your order!\nYour payment was successful.\n\nOrder ID: ${razorpay_order_id}\nPayment ID: ${razorpay_payment_id}\nTotal Amount Paid: ₹${total}\n\nYour invoice is attached.\n\n— GoldenBite`,
//         attachments: [{ filename: fileName, path: filePath }],
//       });

//       console.log("✅ Email sent to:", customer.email);
//     } else {
//       console.log("❗ No customer email found, skipping email.");
//     }

//     console.log("📦 Customer received:", customer);
//     console.log("🛒 Items received:", items);
 

//     // ✅ Send response back to frontend
//     res.status(200).json({
//       status: "success",
//       message: "Payment verified and invoice email sent",
//       invoiceUrl: `/invoices/${fileName}`,
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       total,
//     });

//   } catch (e) {
//     console.error("verify-payment error:", e);
//     res.status(500).json({ status: "error", message: "Internal Server Error" });
//   }
// });


// app.get("/payment-success", (req, res) => res.sendFile(path.join(__dirname, "public", "success.html")));
// app.get("/payment-failure", (req, res) => res.sendFile(path.join(__dirname, "public", "failure.html")));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// if (customer?.email) {
//   console.log("📨 Attempting to send email to:", customer.email);

//   transporter.sendMail({
//     from: process.env.MAIL_FROM,
//     to: customer.email,
//     subject: `Order Confirmed - ${razorpay_order_id}`,
//     text: `Hi ${customer.firstName},\n\nYour payment was successful.\nInvoice is attached.\n\n— GoldenBite`,
//     attachments: [{ filename: fileName, path: filePath }],
//   }, (err, info) => {
//     if (err) {
//       console.error("❌ Email send error:", err);
//     } else {
//       console.log("✅ Email sent successfully:", info.response);
//     }
//   });

// } else {
//   console.log("❗ No email found in customer object.");
// }

//     res.status(200).json({
//       status: "success",
//       message: "Payment verified",
//       invoiceUrl: `/invoices/${fileName}`,
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       total,
//     });
//   } catch (e) {
//     console.error("verify-payment error:", e);
//     res.status(500).json({ status: "error", message: "Internal Server Error" });
//   }
// });
