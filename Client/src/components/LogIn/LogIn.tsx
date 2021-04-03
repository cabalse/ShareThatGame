import "./LogIn.css";

import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { ConnectionInfoType, Context, STATUS } from "../../context";
import { useContext, useRef, useState } from "react";

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
          ctx.setConnectionInformation(
            (prevState: ConnectionInfoType): ConnectionInfoType => {
              return {
                ...prevState,
                connected: true,
                gameRoom: room[0].title,
              };
            }
          );
          ctx.setStatus(STATUS.INIT);
        } else {
          setLoginError(logInStatus.message);
        }
      }
    );
  };

  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>ShareTheGame</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              Welcome to ShareTheGame. Select a game below and enter the
              password. Have fun!
            </Col>
          </Row>
          {isLoading ? (
            <Row>
              <Col>Loading information...</Col>
            </Row>
          ) : (
            <>
              <Row>
                <Col>Game room:</Col>
                <Col>
                  <GameRooms
                    gameRoomList={gameRoomList}
                    onChange={(id) => setRoomId(id)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>Password:</Col>
                <Col>
                  <input type="password" ref={pwdRef} />
                </Col>
              </Row>
              <Row>
                <Col>{loginError}</Col>
              </Row>
            </>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLoginClick}>
          LogIn
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
