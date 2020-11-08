const router = require("express").Router();
const multer = require("multer");
const ServerError = require("../../Application/Errors/ServerError");
const { addImage } = require("../../Application/Image/AddImage/AddImage");
const { getCurrentMiddlewares } = require("../Middlewares/Auth.Middlewares");
const upload = multer({ limits: { fieldSize: 25 * 1024 * 1024 } });

router.post("", [upload.none(), getCurrentMiddlewares], async (req, res) => {
  try {
    const result = await addImage(req.body.File, req.userId);
    return res.json(result);
  } catch (error) {
    return res.json(ServerError);
  }
});

module.exports = router;
