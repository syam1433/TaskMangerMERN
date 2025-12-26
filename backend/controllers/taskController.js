const Task = require("../models/Task");

const User = require("../models/User");

exports.userTasks = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const tasks = await Task.find({ userEmail });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};



exports.adminTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, userEmail } = req.body;

    if (!title || !userEmail) {
      return res.status(400).json({ message: "Title and userEmail required" });
    }

    const task = await Task.create({
      title,
      description,
      userEmail
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
