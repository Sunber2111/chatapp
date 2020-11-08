class IModifyHandler {
  constructor(request) {
    this.username = request.body["username"];
    this.email = request.body["email"];
    this.birthday = request.body["birthday"];
    this.sex = request.body["sex"];
    this.id = request.body["id"];
  }
}

module.exports = IModifyHandler;
