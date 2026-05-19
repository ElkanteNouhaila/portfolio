const User = require("../models/User");

const seedAdmin = async () => {
  const count = await User.countDocuments();
  if (count > 0) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      "No admin user found. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env to create one."
    );
    return;
  }

  await User.create({ email, password });
  console.log(`Admin user created: ${email}`);
};

module.exports = seedAdmin;
