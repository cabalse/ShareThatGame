import { ConnectionInfoType, Context } from "./../../context";
import { useContext, useRef, useState } from "react";

import GameRooms from "../GameRooms";
import React from "react";

export type LogInInformation = { room: string; password: string | undefined };

type Props = {
  onLogin: (logInInfo: LogInInformation) => void;
};

export default function LogIn(props: Props) {
  const ctx = useContext(Context);
  const [roomId, setRoomId] = useState("0");
  const pwdRef = useRef<HTMLInputElement>(null);
  const handleLoginClick = () => {
    ctx.setConnectionInformation(
      (prevState: ConnectionInfoType): ConnectionInfoType => {
        return {
          ...prevState,
          connected: true,
        };
      }
    );
    props.onLogin({ room: roomId, password: pwdRef.current?.value });
  };
  return (
    <div>
      <div>
        GameRoom: <GameRooms onChange={(id) => setRoomId(id)} />
      </div>
      <div>
        Password: <input type="password" ref={pwdRef} />
      </div>
      <div>
        <button onClick={() => handleLoginClick()}>LogIn</button>
      </div>
    </div>
  );
}
