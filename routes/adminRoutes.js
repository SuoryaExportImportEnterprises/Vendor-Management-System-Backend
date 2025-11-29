const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/temp");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * CREATE NEW ADMIN USER
 * Only logged-in admins can add another admin
 */
router.post("/create-admin", auth, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // check if user already exists
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // create new user
  const newUser = new User({ username, passwordHash });

  await newUser.save();

  res.json({ message: "Admin created successfully" });
});


/**
 * RESET PASSWORD FOR ANY ADMIN
 * Only logged-in admin can reset another admin's password
 */
router.put("/reset-password", auth, async (req, res) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(400).json({ message: "Username and new password required" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // update new password
  user.passwordHash = await bcrypt.hash(newPassword, 10);

  await user.save();

  res.json({ message: "Password updated successfully" });
});


/**
 * GET ALL ADMINS (optional — useful for admin list page)
 */
router.get("/all-admins", auth, async (req, res) => {
  const users = await User.find({}, { passwordHash: 0 });  // hide passwords
  res.json(users);
});

module.exports = router;
