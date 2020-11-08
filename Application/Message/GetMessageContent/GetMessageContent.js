const Message = require("../../../Core/Message");

module.exports.getMessageContent = async (conversationId, userId) => {
  const result = await Message.findById(conversationId);
  let data = { conversationId };
  data.messageContent = [];
  if (result)
    result.messageContent.map((val) => {
      data.messageContent.push({
        isSend: val.userSend + "" === userId ? true : false,
        time: val.time,
        content: val.content,
      });
    });
  return data;
};
