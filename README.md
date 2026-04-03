<div align="center">

# 🍔 Golden Bite

**A production-ready full-stack food ordering platform engineered using the MERN stack, featuring secure authentication, real-time order processing, payment integration, and an analytics-driven admin dashboard.**





> An end-to-end food ordering experience — from browsing the menu and placing orders to real-time payment processing, automated PDF invoices, and a powerful admin dashboard.

</div>

---

## 🚀 Key Highlights

- Architected a scalable full-stack MERN application with modular structure
- Implemented secure OTP-based authentication using JWT and SMTP services
- Integrated Razorpay for real-time payment processing
- Built real-time admin dashboard using Socket.IO
- Automated invoice generation system using PDFKit

---

## 🌐 Live Demo

| Service    | URL                                          |
|------------|----------------------------------------------|
| 🖥️ Frontend | [goldenbite.vercel.app](https://goldenbite.vercel.app) |

---

## ✨ Key Features

### 🛒 For Users
- **OTP-Based Auth** — Secure registration, OTP login, and password reset via Nodemailer (SMTP).
- **Smart Cart & Checkout** — Intuitive cart management with real-time price calculation.
- **Razorpay Payments** — Safe, fast, and seamless online payment processing.
- **PDF Invoices** — Auto-generated professional invoice PDF sent via email after every order.
- **Order Tracking** — Real-time order status updates per order.
- **Premium Dark UI** — Custom glassmorphism-styled, fully responsive dark mode interface.

### 🛡️ For Admins
- **Analytics Dashboard** — Real-time revenue, order counts, and business KPIs at a glance.
- **Order Management** — QR code verification, order status control, and cancellation flow.
- **Menu Control** — Add, edit, and manage food items with image uploads.
- **User Management** — View, edit, block/unblock users directly from the dashboard.
- **Real-time Notifications** — Instant order alerts via Socket.IO.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│         React 19 (Vite) + React Router + AOS            │
│                   Vercel (Hosting)                      │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS / Socket.IO
┌───────────────────────▼─────────────────────────────────┐
│                       SERVER                            │
│           Node.js + Express.js REST API                 │
│           Socket.IO (Real-time Events)                  │
│                   Render (Hosting)                      │
└──────┬──────────────────────────────────┬───────────────┘
       │                                  │
┌──────▼──────┐                  ┌────────▼───────┐
│  MongoDB    │                  │   3rd Party    │
│  Atlas      │                  │   Services     │
│  (Database) │                  │ Razorpay (Pay) │
└─────────────┘                  │ Nodemailer     │
                                 │ PDFKit         │
                                 └────────────────┘
```

---

## 🛠️ Technology Stack

| Layer            | Technologies                                                    |
|------------------|-----------------------------------------------------------------|
| **Frontend**     | React (Vite), React Router DOM, AOS, React Icons, Bootstrap   |
| **Backend**      | Node.js, Express.js, Socket.IO                                  |
| **Database**     | MongoDB, Mongoose                                               |
| **Auth**         | JWT (JSON Web Tokens), Bcrypt                                   |
| **Payments**     | Razorpay API                                                    |
| **Email**        | Nodemailer (SMTP via Gmail)                                     |
| **PDF**          | PDFKit                                                          |
| **Deployment**   | Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)   |

---

## ☁️ Deployment

| Service           | Platform         | Description                          |
|-------------------|------------------|--------------------------------------|
| React Frontend    | **Vercel**       | Continuous deployment from `main` branch |
| Express Backend   | **Render**       | Auto-deployed Node.js web service    |
| Database          | **MongoDB Atlas**| Managed cloud MongoDB cluster        |

---

## ⚙️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Razorpay Account](https://razorpay.com/) (for test keys)
- Gmail App Password (for SMTP email)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Golden-Bite.git
cd Golden-Bite
```

### 2. Install All Dependencies
```bash
npm run install:all
```
> This installs dependencies for the root, `backend/`, and `frontend/` in one command.

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# Server
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# SMTP Email (Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM="Golden Bite <your_email@gmail.com>"
```

### 4. Start the Application
```bash
npm start
```

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:5173    |
| Backend  | http://localhost:3000    |

---

## 📁 Project Structure

```
Golden-Bite/
├── frontend/              # React (Vite) app
│   └── src/
│       ├── pages/         # Route-level components
│       ├── components/    # Reusable UI components
│       └── context/       # Global state (Cart, Auth)
├── backend/               # Express.js server
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route handlers
│   ├── middleware/        # Auth middleware
│   └── server.js          # App entry point
└── package.json           # Root scripts (monorepo)
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

<div align="center">
  <strong>Built with ❤️ by <a href="https://github.com/piyushraj0169">Piyush Raj</a></strong>
</div>
