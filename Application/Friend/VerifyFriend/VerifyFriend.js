const Friend = require("../../../Core/Friend");
const VerifySuccess = require("../DTO/VerifySuccess");

module.exports.verifyFriend = async (IVerifyFriend) => {
  const { idFriend } = IVerifyFriend;
  await Friend.findByIdAndUpdate(idFriend, { $set: { isVerify: true } });
  return VerifySuccess;
};
