const User = require("../../../Core/User");

module.exports.getById = async (IGetbyIdHandler) => {
  const { id } = IGetbyIdHandler;
  return await User.findById(id);
};
