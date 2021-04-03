import "./InitInformation.css";

import { Col, Container, Modal, Row } from "react-bootstrap";
import { Context, STATUS } from "../../context";
import { useContext, useEffect } from "react";

export default function InitInformation() {
  const ctx = useContext(Context);
  useEffect(() => {
    ctx.setStatus(STATUS.GAME);
  }, []);
  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Init Game room!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>Getting the Game room ready for the session!</Col>
          </Row>
          <Row>
            <Col>Information:</Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
