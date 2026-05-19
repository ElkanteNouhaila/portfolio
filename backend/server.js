const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));