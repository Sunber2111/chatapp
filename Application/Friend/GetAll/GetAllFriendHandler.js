const Friend = require("../../../Core/Friend");
const FriendDTO = require("../DTO/FriendDTO");

module.exports.getAllFriend = async (IGetAllFriendHandler) => {

  const { idUser } = IGetAllFriendHandler;

  const data = await Friend.find({ user1: idUser, isVerify: true }).populate(
    "user2"
  );
  
  const data_rest = await Friend.find({
    user2: idUser,
    isVerify: true,
  }).populate("user1");

  const final = data.concat(data_rest);

  let friends = [];

  final.forEach((x) => {
    if (x.user1 + "" === idUser) {
      friends.push(new FriendDTO(x.user2));
    } else {
      friends.push(new FriendDTO(x.user1));
    }
  });

  return friends;
};
