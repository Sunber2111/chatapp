const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  birthday: Date,
  sex: Boolean,
  image: String,
});

module.exports = User = mongoose.model("user", UserSchema);
