const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const seedAdmin = require("./utils/seedAdmin");

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

let adminSeeded = false;

app.use(async (req, res, next) => {
  try {
    await connectDB();

    if (!adminSeeded && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      await seedAdmin();
      adminSeeded = true;
    }

    next();
  } catch (error) {
    console.error("Database connection error:", error.message);
    res.status(503).json({ message: "Database connection failed" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/api/health", (req, res) => {
  const state = require("mongoose").connection.readyState;
  res.status(state === 1 ? 200 : 503).json({
    status: state === 1 ? "ok" : "disconnected",
    database: state === 1 ? "connected" : "disconnected",
  });
});

module.exports = app;
