const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "admin", // all users are admins
  }
});

module.exports = mongoose.model("User", UserSchema);
