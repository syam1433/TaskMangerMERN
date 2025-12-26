const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role,
    email: user.email, },
    process.env.JWT_SECRET
  );

  res.json({ token, role: user.role });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("name email");
  res.json(users);
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("name email role");
  res.json(user);
};

