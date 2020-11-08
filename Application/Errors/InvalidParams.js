class InvalidParams {
  constructor(err) {
    this.code = 422;
    this.description = err.msg;
    this.name = "Sai tham số";
  }
}

module.exports = InvalidParams;
