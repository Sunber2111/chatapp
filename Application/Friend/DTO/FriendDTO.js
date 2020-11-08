class FriendDTO {
  constructor(user) {
    this.username = user.username;
    this.userId = user._id;
  }
}

module.exports = FriendDTO;
