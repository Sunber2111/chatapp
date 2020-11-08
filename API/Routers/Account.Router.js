const ILoginHandler = require("../../Application/Account/login/ILoginHander");
const { handleLogin } = require("../../Application/Account/login/LoginHandler");
const IRegistryHandler = require("../../Application/Account/registry/IRegistryHandler");
const {
  registryHandler,
} = require("../../Application/Account/registry/RegistryHandler");
const ServerError = require("../../Application/Errors/ServerError");
const IInsertHandler = require("../../Application/User/Insert/IInsertHandler");
const {
  loginMiddlewares,
  registryMiddlewares,
} = require("../Middlewares/Account.Middlewares");
const { validationResult } = require("express-validator");
const InvalidParams = require("../../Application/Errors/InvalidParams");
const router = require("express").Router();

router.post("/login", loginMiddlewares, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json(new InvalidParams(errors.errors[0]));
    
    return res.json(await handleLogin(new ILoginHandler(req)));
  } catch (error) {
    if (error.code) return res.status(error.code).json(error);
    return res.status(500).json(ServerError);
  }
});

router.post("/registry", registryMiddlewares, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json(new InvalidParams(errors.errors[0]));

    return res.json(
      await registryHandler(new IRegistryHandler(req), new IInsertHandler(req))
    );
  } catch (error) {
    if (error.code) return res.status(error.code).json(error);
    return res.status(500).json(ServerError);
  }
});

module.exports = router;
