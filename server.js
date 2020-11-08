const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const createConnectionToDb = require("./Config/ConnectDB");
const app = express();
const cors = require("cors");
const { sendMessageHandle, sendInvitationFriend, acceptFriend } = require("./API/Chat/SendMessageHandle");
const PORT = process.env.PORT || 5000;
const Friend = require('./Core/Friend')
const path = require('path');

createConnectionToDb();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/account", require("./API/Routers/Account.Router"));
app.use("/api/v1/friend", require("./API/Routers/Friend.Router"));
app.use("/api/v1/user", require("./API/Routers/User.Router"));
app.use("/api/v1/message", require("./API/Routers/Message.Router"));
app.use("/api/v1/image", require("./API/Routers/Image.Router"));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", async (socket) => {

  socket.on("acceptFriend", async (data) => {
    const { conversationId } = data;
    let friend = await Friend.findById(conversationId).populate("user2");
    const { email, sex, birthday, image, username, _id } = friend.user2;
    const newData = {
      email,
      sex,
      birthday,
      username,
      _id,
      image,
      conversationId,
    };
    const room = friend.user1
    io.sockets.to(room).emit("addNewUserToListChat", newData);
  });

  socket.on("privatechatroom", (data) => {
    socket.join(data);
  });

  socket.on("disconnect", () => {
  });

  socket.on("sendMessage", async (data) => {
    await sendMessageHandle(io, data);
  });

  socket.on("sendInvitationFriend", async (data) => {
    await sendInvitationFriend(io, data);
  });

});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(PORT, function () {
  console.log(`server run on port ${PORT}`);
});
