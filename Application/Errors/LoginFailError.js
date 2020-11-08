class LoginFailError {
  constructor() {
    this.code = 401;
    this.description = "Sai Tên Đăng Nhập Hoặc Mật Khẩu";
    this.name = "Lỗi Đăng Nhập";
  }
}

module.exports = new LoginFailError();
