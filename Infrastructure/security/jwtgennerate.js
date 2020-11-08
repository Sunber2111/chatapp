const jwt = require("jsonwebtoken");
const keys = require("../../Config/config.json").keys;

module.exports.genToken = (id, expiresTime = 86400) => {
  const payload = { id };
  const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: expiresTime });
  return token;
};
