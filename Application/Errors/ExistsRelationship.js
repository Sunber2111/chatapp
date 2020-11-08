class ExistsRelationship {
  constructor() {
    this.code = 400;
    this.description = "Đã thêm bạn bè, không thể thêm bạn được nữa";
    this.name = "Lỗi Kết Bạn";
  }
}

module.exports = new ExistsRelationship();
