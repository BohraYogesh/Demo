import adminAuth from "../middleware/adminAuth.js";
import express from "express";
import Confession from "../models/Confession.js";
import mongoose from "mongoose"; // MOST IMPORTANT

const router = express.Router();

// Add Confession
router.post("/", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { confession, category, avatar } = req.body;

    // 🔒 Validation
        if (!avatar) {
      return res
        .status(400)
        .json({ success: false, message: "Avatar is required" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    }

    if (!confession) {
      return res
        .status(400)
        .json({ success: false, message: "Confession is required" });
    }

    const save = await Confession.create({
      confession,
      category,
      avatar,
      senderIP: ip,
    });

    res.json({ success: true, data: save });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Get All
router.get("/", async (req, res) => {
  const all = await Confession.find().sort({ createdAt: -1 });
  res.json(all);
});

// Get Single
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid confession ID" });
    }

    const confession = await Confession.findById(id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }

    res.status(200).json(confession);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete

router.delete("/:id", adminAuth, async (req, res) => {
  await Confession.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
