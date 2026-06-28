const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/task");

const router = express.Router();

const sendError = (res, statusCode, message, details) => {
  res.status(statusCode).json({ success: false, error: message, details });
};

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    sendError(res, 500, "Unable to fetch tasks.", error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const taskText = req.body?.task?.trim();

    if (!taskText) {
      return sendError(res, 400, "Task text is required.");
    }

    const task = await new Task({ task: taskText, completed: Boolean(req.body?.completed) }).save();
    res.status(201).json(task);
  } catch (error) {
    sendError(res, 500, "Unable to create task.", error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendError(res, 400, "Invalid task id.");
    }

    const update = {};
    if (typeof req.body?.task === "string") {
      const taskText = req.body.task.trim();
      if (!taskText) {
        return sendError(res, 400, "Task text cannot be empty.");
      }
      update.task = taskText;
    }

    if (typeof req.body?.completed === "boolean") {
      update.completed = req.body.completed;
    }

    if (Object.keys(update).length === 0) {
      return sendError(res, 400, "No valid fields were provided for update.");
    }

    const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });

    if (!task) {
      return sendError(res, 404, "Task not found.");
    }

    res.json(task);
  } catch (error) {
    sendError(res, 500, "Unable to update task.", error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendError(res, 400, "Invalid task id.");
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return sendError(res, 404, "Task not found.");
    }

    res.json({ success: true, deletedTask: task });
  } catch (error) {
    sendError(res, 500, "Unable to delete task.", error.message);
  }
});

module.exports = router;
