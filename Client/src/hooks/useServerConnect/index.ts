import socketIOClient from "socket.io-client";
import { useEffect } from "react";

const ENDPOINT = "http://127.0.0.1:4001";
const SESSIONID = "DRAGONS";

export type message = {
  type: string;
  target: string;
  message: string;
};

export default function useServerConnect(
  clientId: string,
  callback: (msg: message) => void
): void {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on(SESSIONID, (data: message) => {
      callback(data);
    });
  }, []);
}
