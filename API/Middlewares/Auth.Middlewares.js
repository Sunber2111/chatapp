const jwt = require("jsonwebtoken");
const key = require("../../Config/config.json").keys.secretOrKey;

module.exports.getCurrentMiddlewares = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ msg: "Authorization Deni" });
  try {
    const decode = jwt.verify(token, key);
    req.userId = decode.id;

    next();
  } catch (error) {
    res.status(400).json({ msg: "No Token, Authorization Deni" });
  }
};
