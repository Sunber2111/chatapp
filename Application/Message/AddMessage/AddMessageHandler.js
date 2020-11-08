const Message = require("../../../Core/Message");

module.exports.addMessageHandler = async (IAddMessageHandler) => {
  const { conversationId, content, IdUserSend } = IAddMessageHandler;
  let message = await Message.findById(conversationId);
  if (message) {
    message.messageContent.unshift({
      userSend: IdUserSend,
      content,
      time: new Date(),
    });
    await message.save();
  } else {
    let mess = new Message({
      _id: conversationId,
      messageContent: [
        {
          userSend: IdUserSend,
          content,
          time: new Date(),
        },
      ],
    });
    await mess.save();
  }
};
