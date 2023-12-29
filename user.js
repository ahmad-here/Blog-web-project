// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  // other user details
});

module.exports = mongoose.model('User', userSchema);
