const cloudinary = require("cloudinary").v2;
const { api_key, api_secret, cloud_name } = require("./config.json");

cloudinary.config({
  api_key,
  api_secret,
  cloud_name,
});

module.exports = { cloudinary };
