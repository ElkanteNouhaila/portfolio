const path = require("path");
const fs = require("fs");

const envPath = path.join(__dirname, "../backend/.env");
if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
}

const app = require("../backend/app");

module.exports = app;
