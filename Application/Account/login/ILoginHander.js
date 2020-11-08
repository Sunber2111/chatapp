class ILoginHandler {
  constructor(request) {
    this.namelogin = request.body["namelogin"];
    this.password = request.body["password"];
  }
}

module.exports = ILoginHandler;
