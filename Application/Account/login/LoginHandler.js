const Account = require("../../../Core/Account");
const LoginFailError = require("../../Errors/LoginFailError");
const LoginSuccess = require("../DTO/LoginSuccess");
const { genToken } = require("../../../Infrastructure/security/jwtgennerate");

module.exports.handleLogin = async (ILoginHander) => {
  const { namelogin, password } = ILoginHander;
  const result = await Account.findById(namelogin).populate("user");
  if (!result) throw LoginFailError;
  if (!result.comparePassword(password)) throw LoginFailError;
  const token = genToken(result.user._id);
  return new LoginSuccess(token, result.user._id, result.user.image);
};
