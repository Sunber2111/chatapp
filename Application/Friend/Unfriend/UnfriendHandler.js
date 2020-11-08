const Friend = require("../../../Core/Friend");
module.exports.unfriendHandler = async (idFriend) => {
  await Friend.findByIdAndRemove(idFriend);
};
