class IAddHandler {
    constructor(request) {
      this.idUserSend = request.body["idUserSend"];
      this.idUserRecive = request.body["idUserRecive"];
    }
  }
  
  module.exports = IAddHandler;
  