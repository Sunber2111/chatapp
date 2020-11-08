const Friend = require("../../../Core/Friend");
const ExistsRelationship = require("../../Errors/ExistsRelationship");
const AddFriendSuccess = require("../DTO/AddFriendSuccess");

module.exports.addHandler = async (IAddHandler) => {
  const { idUserSend, idUserRecive } = IAddHandler;
  const check = await Friend.find({ user1: idUserSend, user2: idUserRecive });
  const check_rest = await Friend.find({
    user2: idUserSend,
    user1: idUserRecive,
  });
  if (check.length != 0 || check_rest.length != 0) return ExistsRelationship;
  let friend = new Friend({
    user1: idUserSend,
    user2: idUserRecive,
    isVerify: false,
  });
  const newFriend = await friend.save();
  return new AddFriendSuccess(newFriend._id);
};
