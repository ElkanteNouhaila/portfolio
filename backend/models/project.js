const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    github: String,
    demo: String,
    vercel: String,
    category: { type: String, default: "AI" },
    tags: [String],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);