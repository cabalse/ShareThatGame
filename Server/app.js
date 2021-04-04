const express = require("express");
const http = require("http");
var cors = require("cors");
const GameRooms = require("./src/modules/gameRooms");

const port = process.env.PORT || 4001;
const router = require("./src/routes");

const app = express();
app.use(cors());
app.use(router);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const Socket = require("./src/socket");
const socket = new Socket(io);

server.listen(port, () => console.log(`Listening on port ${port}`));

setInterval(() => {
  let rooms = GameRooms.getGameRooms();
  rooms.forEach((room) => {
    if (room.active) room.activeTime++;
  });
}, 1000);
