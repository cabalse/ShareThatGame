import "./App.css";

import { Col, Container, Row } from "react-bootstrap";
import { Context, useContextStore } from "./../../context";
import useServerConnect, { message } from "../../hooks/useServerConnect";

import Header from "../Header";
import { useState } from "react";

function App() {
  const contextStore = useContextStore();
  const [response, setResponse] = useState("");
  useServerConnect("ID", (obj: message) => {
    setResponse(obj.message);
  });
  return (
    <Context.Provider value={contextStore}>
      <Container fluid={true} className="noPadding">
        <Row noGutters>
          <Col>
            <Header />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            It's <time dateTime={response}>{response}</time>
          </Col>
        </Row>
      </Container>
    </Context.Provider>
  );
}

export default App;
