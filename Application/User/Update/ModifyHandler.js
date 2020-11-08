const User = require("../../../Core/User");
const ModifySuccess = require("../DTO/ModifySuccess");

module.exports.modifyHandler = async (IModifyHandler) => {
  const { id } = IModifyHandler;
  await User.findByIdAndUpdate(id, { $set: IModifyHandler });
  return ModifySuccess;
};
