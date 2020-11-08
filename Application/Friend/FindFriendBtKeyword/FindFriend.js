const Friend = require("../../../Core/Friend");
const User = require("../../../Core/User");

module.exports.findFriend = async (IFindFriend) => {
  let { userId, keyword } = IFindFriend;
  keyword = keyword.toLowerCase();
  const data = await User.find({});
  let finalData = [],
    upStreamData = [];

  data.map((res) => {
    const username = res.username;
    if (username.toLowerCase().includes(keyword) && res._id != userId) {
      finalData.push(res);
    }
  });

  for (let index = 0; index < finalData.length; index++) {
    const val = finalData[index];
    const isConnect = await Friend.findOne({ user1: userId, user2: val._id });
    const isConnect_rest = await Friend.findOne({
      user2: userId,
      user1: val._id,
    });
    if (isConnect || isConnect_rest) {
      if (isConnect && isConnect.isVerify === false) {
        upStreamData.push({
          id: val._id,
          username: val.username,
          isFriend: true,
          image: val.image,
          isSend: true,
        });
        continue;
      }
      if (
        isConnect_rest &&
        isConnect_rest.isVerify === false
      ) {
        upStreamData.push({
          id: val._id,
          username: val.username,
          isFriend: true,
          image: val.image,
          isSend: true,
        });
        continue;
      }
      upStreamData.push({
        id: val._id,
        username: val.username,
        isFriend: true,
        image: val.image,
      });
    } else {
      upStreamData.push({
        id: val._id,
        username: val.username,
        isFriend: false,
        image: val.image,
      });
    }
  }
  return upStreamData;
};
