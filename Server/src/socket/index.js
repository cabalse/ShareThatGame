class Socket {
  constructor(io) {
    this.io = io;
    this.interval = 0;
    setInterval(() => this.interval++, 1000);

    this.io.on("connection", (socket) => {
      let id = socket.id;
      console.log("New client connected id:" + id);

      socket.on("authentication", (authObject) => {
        if (authObject.password === "1") {
          socket.emit("authentication_resp", {
            authentication: true,
            message: "OK",
          });
          socket.join(authObject.room);
        } else {
          socket.emit("authentication_resp", {
            authentication: false,
            message: "Wrong password!!!",
          });
        }
      });

      setInterval(() => {
        socket.emit("General message " + this.interval, this.interval);
      }, 10000);

      setInterval(() => {
        socket.to("1").emit("GR1 " + this.interval, this.interval);
      }, 5000);

      setInterval(() => {
        socket.to("2").emit("GR2 " + this.interval, this.interval);
      }, 6000);

      socket.on("disconnect", () => {
        console.log("Client disconnected with id " + id);
      });
    });
  }
}

module.exports = Socket;
