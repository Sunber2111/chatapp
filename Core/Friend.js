const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  isVerify:Boolean
});

module.exports = Friend = mongoose.model("friend", FriendSchema);
