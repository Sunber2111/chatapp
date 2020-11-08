const ServerError = require("../../Application/Errors/ServerError");
const { getById } = require("../../Application/User/GetById/GetByIdHandler");
const IGetbyIdHandler = require("../../Application/User/GetById/IGetByIdHandler");
const IModifyHandler = require("../../Application/User/Update/IModifyHandler");
const {
  modifyHandler,
} = require("../../Application/User/Update/ModifyHandler");
const User = require("../../Core/User");
const { getCurrentMiddlewares } = require("../Middlewares/Auth.Middlewares");
const router = require("express").Router();

router.get("/getbyid/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    return res.json(await getById(new IGetbyIdHandler(id)));
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

router.put("/update", async (req, res) => {
  try {
    return res.json(await modifyHandler(new IModifyHandler(req)));
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

router.get("/getcurrent", getCurrentMiddlewares, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    return res.json({ status: "Chấp nhận token", userId: req.userId,image:user.image });
  } catch (error) {
    return res.status(500).json(ServerError);
  }
});

module.exports = router;
