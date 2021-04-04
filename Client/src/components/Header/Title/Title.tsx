import { Col, Container, Row } from "react-bootstrap";
import React, { useContext } from "react";

import { Context } from "../../../context";
import Time from "../Time";

export default function Title() {
  const ctx = useContext(Context);
  return (
    <Container>
      <Row>
        <Col>ShareTheGame v0.1</Col>
        <Col>
          {ctx.connectionInformation.connected ? (
            <span>GameRoom: {ctx.connectionInformation.gameRoom}</span>
          ) : (
            <span>Not Connected</span>
          )}
        </Col>
        <Col>
          <Time />
        </Col>
      </Row>
    </Container>
  );
}
