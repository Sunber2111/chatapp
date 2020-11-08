const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "friend",
  },
  messageContent: [
    {
      userSend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      time: Date,
      content: String,
    },
  ],
});

module.exports = Message = mongoose.model("message", MessageSchema);
