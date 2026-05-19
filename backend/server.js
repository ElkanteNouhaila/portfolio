require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/projects", projectRoutes);


// CONNECT MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });