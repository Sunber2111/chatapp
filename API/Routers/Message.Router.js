const ServerError = require("../../Application/Errors/ServerError");
const {
  getAllMessageHandler,
} = require("../../Application/Message/GetById/GetAllMessageFirstHandler");
const {
  getMessageContent,
} = require("../../Application/Message/GetMessageContent/GetMessageContent");
const { getCurrentMiddlewares } = require("../Middlewares/Auth.Middlewares");

const router = require("express").Router();

router.get("/getByIdUser", getCurrentMiddlewares, async (req, res) => {
  try {
    res.json(await getAllMessageHandler(req.userId));
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

router.get("/getMessageContent", getCurrentMiddlewares, async (req, res) => {
  try {
    const { conversationId } = req.query;
    res.json(await getMessageContent(conversationId, req.userId));
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

module.exports = router;
