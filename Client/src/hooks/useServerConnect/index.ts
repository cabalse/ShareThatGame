import { useEffect, useState } from "react";

import { LogInInformationType } from "../../components/LogIn";
import socket from "../../sockets/getSocket";
import { v4 as uuidv4 } from "uuid";

type ServerAuthRespType = {
  authentication: boolean;
  message: string;
};

export type LogInStatusType = {
  loggedIn: boolean;
  message: string;
};

export type MessageType = {
  timeStamp: number;
  event: string;
  args: string[];
};

export default function useServerConnect(
  messageBroker: (type: string, messages: string[]) => void
): (
  logInInfo: LogInInformationType,
  callback: (logInStatus: LogInStatusType) => void
) => void {
  let socketIO = socket;

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {}, []);

  const getTimeStamp = () => {
    var d = new Date();
    var n = d.getMilliseconds();
    return n;
  };

  const establishConnection = (
    logInInfo: LogInInformationType,
    callback: (logInStatus: LogInStatusType) => void
  ): void => {
    socketIO.connect();
    socketIO.emit("authentication", {
      username: uuidv4(),
      password: logInInfo.password,
      room: logInInfo.roomID,
    });
    socketIO.on("authentication_resp", (resp: ServerAuthRespType) => {
      if (resp.authentication) {
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
        callback({ loggedIn: true, message: "OK" });
      } else {
        callback({ loggedIn: false, message: resp.message });
      }
    });
    socketIO.onAny((event, ...args) => {
      messageBroker(event, args);
    });
  };

  return establishConnection;
}
