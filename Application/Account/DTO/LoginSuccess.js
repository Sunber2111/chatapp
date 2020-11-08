class LoginSuccess {
  constructor(jwt, userId, image) {
    this.token = jwt;
    this.status = "Đăng Nhập Thành Công";
    this.userId = userId;
    this.image = image;
  }
}

module.exports = LoginSuccess;
