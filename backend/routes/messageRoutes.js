router.post("/", async (req, res) => {
    try {
      const Message = require("../models/message");
  
      const message = await Message.create(req.body);
  
      res.status(201).json(message);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const Message = require("../models/message");
  
      const messages = await Message.find().sort({ createdAt: -1 });
  
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const Message = require("../models/message");
  
      await Message.findByIdAndDelete(req.params.id);
  
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });