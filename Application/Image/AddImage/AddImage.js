const { cloudinary } = require("../../../Config/Cloudinary");
const User = require("../../../Core/User");
const AddImageSuccess = require("../DTO/AddImageSuccess");

module.exports.addImage = async (data, userId) => {
  const { url } = await cloudinary.uploader.upload(data, {
    upload_preset: "gk_cnm",
  });
  const user = await User.findById(userId);
  if (user) {
    user.image = url;
  }
  await user.save();
  return new AddImageSuccess(url);
};
