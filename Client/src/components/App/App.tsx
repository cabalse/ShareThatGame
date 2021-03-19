import "./App.css";

import { Col, Container, Row } from "react-bootstrap";
import { Context, useContextStore } from "./../../context";

import Header from "../Header";

function App() {
  const contextStore = useContextStore();
  return (
    <Context.Provider value={contextStore}>
      <Container fluid={true} className="noPadding">
        <Row noGutters>
          <Col>
            <Header />
          </Col>
        </Row>
      </Container>
    </Context.Provider>
  );
}

export default App;
