const Friend = require("../../../Core/Friend");
const Message = require("../../../Core/Message");

module.exports.getAllMessageHandler = async (idUser) => {
  const friend = await Friend.find({ user1: idUser, isVerify: true }).populate(
    "user2"
  );
  const friendRest = await Friend.find({
    user2: idUser,
    isVerify: true,
  }).populate("user1");

  const allFriends = friend.concat(friendRest);

  let data = [];
  for (let index = 0; index < allFriends.length; index++) {
    const fri = allFriends[index];
    const result = await Message.findById(fri["_id"]);
    if (result) {
      const message = result.messageContent[0];
      if (fri.user1 + "" === idUser) {
        data.push({
          conversationId: fri["_id"],
          username: fri.user2["username"],
          userFriendId: fri.user2["_id"],
          time: message.time,
          isSend: message.userSend + "" === idUser ? true : false,
          content: message.content,
          image: fri.user2["image"],
          email: fri.user2["email"],
          sex: fri.user2["sex"],
          birthday: fri.user2["birthday"],
        });
      } else {
        data.push({
          conversationId: fri["_id"],
          username: fri.user1["username"],
          email: fri.user1["email"],
          sex: fri.user1["sex"],
          birthday: fri.user1["birthday"],
          time: message.time,
          userFriendId: fri.user1["_id"],
          image: fri.user1["image"],
          isSend: message.userSend + "" === idUser ? true : false,
          content: message.content,
        });
      }
    } else {
      if (fri.user1 + "" === idUser) {
        data.push({
          conversationId: fri["_id"],
          username: fri.user2["username"],
          userFriendId: fri.user2["_id"],
          time: null,
          isSend: false,
          content: null,
          image: fri.user2["image"],
          email: fri.user2["email"],
          sex: fri.user2["sex"],
          birthday: fri.user2["birthday"],
        });
      } else {
        data.push({
          conversationId: fri["_id"],
          username: fri.user1["username"],
          email: fri.user1["email"],
          sex: fri.user1["sex"],
          birthday: fri.user1["birthday"],
          time: null,
          userFriendId: fri.user1["_id"],
          image: fri.user1["image"],
          isSend: false,
          content: null,
        });
      }
    }
  }

  return data;
};
