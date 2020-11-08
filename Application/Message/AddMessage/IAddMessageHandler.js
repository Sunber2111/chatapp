class IAddMessageHandler {
  constructor(data) {
    this.conversationId = data["conversationId"];
    this.content = data["message"];
    this.IdUserSend = data["idUserSend"];
  }
}

module.exports = IAddMessageHandler;
