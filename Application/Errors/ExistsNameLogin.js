class ExistsNameLogin {
  constructor() {
    this.code = 401;
    this.description = "Tên Đăng Nhập Đã Tồn Tại";
    this.name = "Lỗi Đăng Kí";
  }
}

module.exports = new ExistsNameLogin();
