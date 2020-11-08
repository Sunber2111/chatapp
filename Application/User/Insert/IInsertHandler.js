class IInsertHandler {
  constructor(request) {
    this.username = request.body["username"];
    this.email = request.body["email"];
    this.birthday = request.body["birthday"];
    this.sex = request.body["sex"];
  }
}

module.exports = IInsertHandler;
