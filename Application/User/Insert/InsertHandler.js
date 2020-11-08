const User = require("../../../Core/User");
const ServerError = require("../../Errors/ServerError");

module.exports.insertHandler = async (IInsertHander) => {
  try {
    let { username, birthday, email, sex } = IInsertHander;
    birthday = new Date(birthday);
    let user = new User({ username, birthday, email, sex, image: "" });
    const result = await user.save();
    return result;
  } catch (error) {
    throw ServerError;
  }
};
