const User = require("../models/User");

const seedAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.warn(
        "No admin user found. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env"
      );
      return;
    }

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    await User.create({
      email: email.toLowerCase().trim(),
      password,
    });

    console.log(`Admin user created: ${email}`);
  } catch (err) {
    console.error("Seed admin error:", err.message);
  }
};

module.exports = seedAdmin;