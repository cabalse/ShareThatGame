const GameRooms = require("./../modules/gameRooms");

class Socket {
  constructor(io) {
    this.io = io;

    this.io.on("connection", (socket) => {
      let id = socket.id;
      console.log("Connecting ", id);

      socket.on("authentication", (authObject) => {
        let adminAuth = GameRooms.adminAuthorizeForGameRoom(
          authObject.room,
          authObject.password
        );
        let userAuth = GameRooms.authorizeForGameRoom(
          authObject.room,
          authObject.password
        );

        if (adminAuth | userAuth) {
          let room = GameRooms.getGameRoomByID(authObject.room);

          if (adminAuth) {
            room.admin = id;
            room.active = true;
          } else {
            room.users.push(id);
          }

          socket.emit("authentication_resp", {
            administrator: adminAuth,
            authentication: true,
            message: "OK",
          });

          socket.join(room.title);
        } else {
          socket.emit("authentication_resp", {
            administrator: false,
            authentication: false,
            message: "Wrong password!!!",
          });
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected with id " + id);
      });

      setInterval(() => {
        let rooms = GameRooms.getGameRooms();
        rooms.forEach((room) => {
          if (room.active)
            socket.to(room.title).emit("alive update", room.activeTime);
        });
      }, 1000);
    });
  }
}

module.exports = Socket;
