import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create task
router.post("/", protect, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user, title, description });
  res.json(task);
});

// Get all tasks
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
  res.json(tasks);
});

// Update task
router.put("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user) return res.status(401).json({ message: "Not authorized" });

  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user) return res.status(401).json({ message: "Not authorized" });

  await task.deleteOne();
  res.json({ message: "Task deleted" });
});

export default router;
