import { useEffect, useState } from "react";

import { LogInInformation } from "../../components/LogIn";
import socket from "../../sockets/getSocket";
import { v4 as uuidv4 } from "uuid";

export type MessageType = {
  timeStamp: number;
  event: string;
  args: string[];
};

export default function useServerConnect(): [
  (logInInfo: LogInInformation, callback: () => void) => void,
  MessageType[],
  string
] {
  let socketIO = socket;

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {}, []);

  const getTimeStamp = () => {
    var d = new Date();
    var n = d.getMilliseconds();
    return n;
  };

  const logIn = (logInInfo: LogInInformation, callback: () => void) => {
    socketIO.connect();
    socketIO.emit("authentication", {
      username: uuidv4(),
      password: logInInfo.password,
      room: logInInfo.room,
    });
    socketIO.on("authentication_resp", (resp) => {
      if (resp) {
        socketIO.onAny((event, ...args) => {
          setMessages((prevValue) => {
            let newArray = [...prevValue];
            newArray.push({
              timeStamp: getTimeStamp(),
              event: event,
              args: args,
            });
            return newArray;
          });
          setMessage(event);
        });
        callback();
      }
    });
  };

  return [logIn, messages, message];
}
