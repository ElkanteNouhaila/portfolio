const express = require("express");
const router = express.Router();

const Project = require("../models/project");


// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ADD PROJECT
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PROJECT
router.put("/:id", async (req, res) => {
    try {
      const updated = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // return updated document
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// DELETE PROJECT
router.delete("/:id", async (req, res) => {
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