const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/database");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const seedAdmin = require("./utils/seedAdmin");
const messageRoutes = require("./routes/messageRoutes");


const app = express();

/* ================= CORS ================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://nouhailaelkante-portfolio.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

/* ================= BODY ================= */

app.use(express.json({ limit: "10mb" }));

/* ================= DB + SEED ================= */

let adminSeeded = false;

app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
      console.log("MongoDB connected");
    }
    
    if (
      !adminSeeded &&
      process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD
    ) {
      await seedAdmin();
      adminSeeded = true;
    }
    
    next();
  } catch (error) {
    console.error("Database connection error:", error.message);
    res.status(503).json({ message: "Database connection failed" });
  }
});

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

/* ================= HEALTH ================= */

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/api/health", (req, res) => {
  const state = mongoose.connection.readyState;

  res.status(state === 1 ? 200 : 503).json({
    status: state === 1 ? "ok" : "disconnected",
    database: state === 1 ? "connected" : "disconnected",
  });
});

module.exports = app;