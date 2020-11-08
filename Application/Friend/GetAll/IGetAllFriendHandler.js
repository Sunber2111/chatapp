class IGetAllFriendHandler {
  constructor(request) {
    this.idUser = request.body["idUser"];
  }
}

module.exports = IGetAllFriendHandler;
