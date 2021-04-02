import { io } from "socket.io-client";

const { REACT_APP_SERVER_BASE_URL } = process.env;

const socket = io(REACT_APP_SERVER_BASE_URL as string, {
  autoConnect: false,
});

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;
