class IFindFriend {
  constructor(request) {
    this.keyword = request.params.keyword;
    this.userId = request.userId;
  }
}

module.exports = IFindFriend;
