import { useEffect, useRef, useState } from "react";

import GameRooms from "../GameRooms";
import React from "react";
import useGameRoomList from "../../hooks/useGameRoomList/useGameRoomList";

export type LogInInformationType = {
  room: string;
  roomID: string;
  password: string | undefined;
};

type Props = {
  onLogin: (logInInfo: LogInInformationType) => void;
  displayError: string;
};

export default function LogIn(props: Props) {
  const [roomId, setRoomId] = useState("0");
  const [logInError, setLogInError] = useState("");
  const pwdRef = useRef<HTMLInputElement>(null);
  const [gameRoomList, isLoading] = useGameRoomList();
  useEffect(() => {
    setLogInError(props.displayError);
  }, [props.displayError]);
  const handleLoginClick = () => {
    let room = gameRoomList.filter((room) => String(room.id) === roomId);
    props.onLogin({
      room: room[0].title,
      roomID: roomId,
      password: pwdRef.current?.value,
    });
  };
  return (
    <div>
      {isLoading ? (
        <span>Loading ...</span>
      ) : (
        <>
          <div>
            GameRoom:
            <GameRooms
              gameRoomList={gameRoomList}
              onChange={(id) => setRoomId(id)}
            />
          </div>
          <div>
            Password: <input type="password" ref={pwdRef} />
            {logInError !== "" ? <span>{logInError}</span> : null}
          </div>
          <div>
            <button onClick={() => handleLoginClick()}>LogIn</button>
          </div>
        </>
      )}
    </div>
  );
}
