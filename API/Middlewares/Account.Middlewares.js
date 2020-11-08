const { check } = require("express-validator");

module.exports.loginMiddlewares = [
  check("namelogin", "Bắt buộc phải có tên đăng nhập").not().isEmpty(),
  check("password", "Bắt buộc phải có mật khẩu")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
];

module.exports.registryMiddlewares = [
  check("namelogin", "Bắt buộc phải có tên đăng nhập").not().isEmpty(),
  check("password", "Bắt buộc phải có mật khẩu")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
  check("email", "Bắt buộc phải có email").not().isEmpty().isEmail(),
  check("birthday", "Bắt buộc phải có ngày sinh").not().isEmpty(),
  check("sex", "Bắt buộc phải có giới tính").not().isEmpty(),
  check("username", "Bắt buộc phải có tên người dùng").not().isEmpty(),
];
