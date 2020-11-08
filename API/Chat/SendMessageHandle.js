const { addHandler } = require("../../Application/Friend/AddFriend/Addhandler");
const IAddHandler = require("../../Application/Friend/AddFriend/IAddHandler");
const {
  addMessageHandler,
} = require("../../Application/Message/AddMessage/AddMessageHandler");
const IAddMessageHandler = require("../../Application/Message/AddMessage/IAddMessageHandler");
const Friend = require("../../Core/Friend");
const User = require("../../Core/User");

module.exports.sendMessageHandle = async (io, data) => {
  try {
    await addMessageHandler(new IAddMessageHandler(data));

    const { image, email, sex, birthday, username } = data;

    io.sockets.in(data.room).emit("new_msg", {
      idUserSend: data.idUserSend,
      content: data.message,
      idUserRecive: data.idUserRecive,
      image: image,
      conversationId: data.conversationId,
      email,
      sex,
      birthday,
      username,
    });
    io.sockets.in(data.idUserSend).emit("new_msg", {
      idUserSend: data.idUserSend,
      content: data.message,
      idUserRecive: data.idUserRecive,
      conversationId: data.conversationId,
    });
  } catch (error) {
  }
};

module.exports.sendInvitationFriend = async (io, data) => {
  try {
    const { idUserSend, idUserRecive } = data;

    const userSend = await User.findById(idUserSend);

    const result = await addHandler(
      new IAddHandler({ body: { idUserSend, idUserRecive } })
    );

    io.sockets.in(idUserSend).emit("recive_invitation_friend", {
      idUserSend: userSend["_id"],
      image: userSend["image"],
      username: userSend["username"],
      friendId: result["idFriend"],
      isSend: false,
    });

    io.sockets.in(idUserRecive).emit("recive_invitation_friend", {
      idUserSend: userSend["_id"],
      image: userSend["image"],
      username: userSend["username"],
      friendId: result["idFriend"],
      isSend: true,
    });
  } catch (error) {
  }
};

module.exports.acceptFriend = async (io, data) => {
  const { conversationId } = data;
  let friend = await Friend.findById(conversationId).populate("user2");
  const { email, sex, birthday, image, username, _id } = friend.user2;
  const newData = {
    email,
    sex,
    birthday,
    username,
    _id,
    image,
    conversationId,
  };
  const room = friend.user1
  io.sockets.to(room).emit("accept_friend_sucess", newData);
};
