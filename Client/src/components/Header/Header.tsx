import { Col, Container, Row } from "react-bootstrap";

import Menu from "./Menu";
import Title from "./Title";

export default function Header() {
  return (
    <Container>
      <Row>
        <Col>
          <Title />
          <Menu />
        </Col>
      </Row>
    </Container>
  );
}
