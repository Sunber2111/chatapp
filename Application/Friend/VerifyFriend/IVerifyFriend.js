class IRevifyFriend {
    constructor(request) {
      this.idFriend = request.body["idFriend"];
    }
  }
  
  module.exports = IRevifyFriend;