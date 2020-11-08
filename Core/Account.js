const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AccountSchema = new mongoose.Schema({
  _id: String,
  password: String,
  isActivate: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

AccountSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = Account = mongoose.model("account", AccountSchema);
