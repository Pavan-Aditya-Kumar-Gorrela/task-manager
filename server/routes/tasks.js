import express from "express";
import Task from "../models/Task.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Create task
router.post("/", auth, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      dueDate, 
      priority, 
      category,
      reminderEnabled 
    } = req.body;

    // Validation
    if (!title?.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!dueDate || isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ message: "Valid due date is required" });
    }

    const task = new Task({
      user: req.user.id,
      title: title.trim(),
      description: description?.trim(),
      dueDate,
      priority: priority || 'medium',
      category: category || 'personal',
      reminderEnabled: reminderEnabled ?? true
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Task creation error:", err);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// Get all tasks for user with filtering and sorting
router.get("/", auth, async (req, res) => {
  try {
    const { 
      sort = 'createdAt', 
      order = 'desc',
      category,
      priority,
      completed,
      search
    } = req.query;

    let query = { user: req.user.id };

    // Apply filters
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (completed !== undefined) query.completed = completed === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query)
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .exec();

    res.json(tasks);
  } catch (err) {
    console.error("Task fetch error:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// Get single task
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("Task fetch error:", err);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = [
      'title', 
      'description', 
      'dueDate', 
      'priority',
      'category',
      'completed',
      'reminderEnabled'
    ];

    // Filter out invalid update fields
    const sanitizedUpdates = Object.keys(updates)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    if (sanitizedUpdates.title?.trim() === '') {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      sanitizedUpdates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("Task update error:", err);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ 
      message: "Task deleted successfully",
      taskId: req.params.id 
    });
  } catch (err) {
    console.error("Task deletion error:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
