const Friend = require("../../../Core/Friend");

module.exports.getFriendNotVerify = async (userId) => {
  const data = await Friend.find({ user2: userId }).populate("user1");

  let result = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.isVerify === false) {
      result.push({
        friendId: element._id,
        username: element.user1["username"],
        image: element.user1["image"],
        userFriendId: element.user1["_id"],
        email: element.user1["email"],
        sex: element.user1["sex"],
        birthday: element.user1["birthday"],
      });
    }
  }

  return result;
};
