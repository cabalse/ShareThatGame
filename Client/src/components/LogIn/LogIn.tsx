import { Button, Modal } from "react-bootstrap";
import { ConnectionInfoType, Context } from "../../context";
import { useContext, useEffect, useRef, useState } from "react";

import GameRooms from "../GameRooms";
import { LogInStatusType } from "./../../hooks/useServerConnect";
import React from "react";
import useGameRoomList from "../../hooks/useGameRoomList/useGameRoomList";

export type LogInInformationType = {
  room: string;
  roomID: string;
  password: string | undefined;
};

type Props = {
  logIn: (
    logInInfo: LogInInformationType,
    callback: (logInStatus: LogInStatusType) => void
  ) => void;
};

export default function LogIn(props: Props) {
  const [roomId, setRoomId] = useState("0");
  const [loginError, setLoginError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [gameRoomList, isLoading] = useGameRoomList();
  const ctx = useContext(Context);
  const pwdRef = useRef<HTMLInputElement>(null);

  const handleLoginClick = () => {
    let room = gameRoomList.filter((room) => String(room.id) === roomId);
    props.logIn(
      {
        room: room[0].title,
        roomID: roomId,
        password: pwdRef.current?.value,
      },
      (logInStatus: LogInStatusType) => {
        if (logInStatus.loggedIn) {
          console.log("LoggedIn", logInStatus);
          ctx.setConnectionInformation(
            (prevState: ConnectionInfoType): ConnectionInfoType => {
              return {
                ...prevState,
                connected: true,
                gameRoom: room[0].title,
              };
            }
          );
          setShowModal(false);
        } else {
          setLoginError(logInStatus.message);
        }
      }
    );
  };

  const handleModalClose = () => {
    console.log("Want to close!");
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>ShareTheGame</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Welcome to ShareTheGame. Select a game below and enter the password.
          Have fun!
        </div>
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
                <span>{loginError}</span>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLoginClick}>
          LogIn
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
