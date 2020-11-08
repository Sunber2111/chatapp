const Account = require("../../../Core/Account");
const ExistsNameLogin = require("../../Errors/ExistsNameLogin");
const bcrypt = require("bcrypt");
const { insertHandler } = require("../../User/Insert/InsertHandler");
const { genToken } = require("../../../Infrastructure/security/jwtgennerate");
const LoginSuccess = require("../DTO/LoginSuccess");

module.exports.registryHandler = async (IRegistryHandler, IInsertHandler) => {
  let { namelogin, password } = IRegistryHandler;
  const result = await Account.findById(namelogin);
  if (result) throw ExistsNameLogin;

  const user = await insertHandler(IInsertHandler);

  password = await bcrypt.hash(password, 10);
  const account = new Account({
    _id: namelogin,
    password,
    isActivate: true,
    user:user._id
  });
  await account.save();
  const token = genToken(user._id);
  return new LoginSuccess(token);
};
