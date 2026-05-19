const express = require("express");
const router = express.Router();

const Project = require("../models/project");
const protect = require("../middleware/authMiddleware");


// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ADD PROJECT (admin only)
router.post("/", protect, async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PROJECT (admin only)
router.put("/:id", protect, async (req, res) => {
    try {
      const updated = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// DELETE PROJECT (admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;