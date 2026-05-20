require("dotenv").config();
const connectDB = require("./config/database");
const app = require("./app");

const PORT = process.env.PORT || 5000;

// Safety check
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is required in .env");
  process.exit(1);
}

const startServer = async () => {
  try {
    await connectDB();

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Allowed origins: ${process.env.CLIENT_URL || "http://localhost:5173"}`
      );
    });
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

startServer();