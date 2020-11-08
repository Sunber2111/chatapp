const { addHandler } = require("../../Application/Friend/AddFriend/Addhandler");
const IAddHandler = require("../../Application/Friend/AddFriend/IAddHandler");
const IVerifyFriend = require("../../Application/Friend/VerifyFriend/IVerifyFriend");
const ServerError = require("../../Application/Errors/ServerError");
const {
  verifyFriend,
} = require("../../Application/Friend/VerifyFriend/VerifyFriend");
const {
  getAllFriend,
} = require("../../Application/Friend/GetAll/GetAllFriendHandler");
const IGetAllFriendHandler = require("../../Application/Friend/GetAll/IGetAllFriendHandler");
const { getCurrentMiddlewares } = require("../Middlewares/Auth.Middlewares");
const {
  findFriend,
} = require("../../Application/Friend/FindFriendBtKeyword/FindFriend");
const IFindFriend = require("../../Application/Friend/FindFriendBtKeyword/IFindFriend");
const {
  getFriendNotVerify,
} = require("../../Application/Friend/GetFriendNotVerify/getFriendNotVerify");
const {
  unfriendHandler,
} = require("../../Application/Friend/Unfriend/UnfriendHandler");
const router = require("express").Router();

router.post("/addfriend", async (req, res) => {
  try {
    return res.json(await addHandler(new IAddHandler(req)));
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

router.post("/verifyFriend", async (req, res) => {
  try {
    return res.json(await verifyFriend(new IVerifyFriend(req)));
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

router.post("/getall", async (req, res) => {
  try {
    return res.json(await getAllFriend(new IGetAllFriendHandler(req)));
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

// /getbykeyword/aasdas
router.get(
  "/getbykeyword/:keyword",
  getCurrentMiddlewares,
  async (req, res) => {
    try {
      return res.json(await findFriend(new IFindFriend(req)));
    } catch (error) {
      return res.status(500).json(ServerError);
    }
  }
);

router.get("/getFriendNotVerify", getCurrentMiddlewares, async (req, res) => {
  try {
    return res.json(await getFriendNotVerify(req.userId));
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

router.get("/unfriend/:friendId", getCurrentMiddlewares, async (req, res) => {
  try {
    await unfriendHandler(req.params["friendId"]);
    return res.json({ status: "Xóa thành công" });
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

module.exports = router;
