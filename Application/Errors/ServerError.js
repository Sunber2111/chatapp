class ServerError {
  constructor() {
    this.code = 500;
    this.description = "Có lỗi xảy ra, vui lòng kiểm tra lại";
    this.name = "Server Error";
  }
}

module.exports = new ServerError();
