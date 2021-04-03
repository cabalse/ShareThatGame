import "./App.css";

import { Col, Container, Row } from "react-bootstrap";
import { ConnectionInfoType, Context } from "./../../context";
import LogIn, { LogInInformationType } from "../LogIn";
import useServerConnect, {
  LogInStatusType,
} from "./../../hooks/useServerConnect";

import Header from "../Header";
import { useState } from "react";
import useStoreContext from "./../../context";

function App() {
  const ctx = useStoreContext();
  const [logIn, messages, message] = useServerConnect();
  return (
    <Context.Provider value={ctx}>
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
            <LogIn logIn={logIn} />
          </Col>
        </Row>
        <Row>
          <Col>Message - {message}</Col>
        </Row>
        <Row>
          <Col>
            {messages.map((message) => (
              <div>
                {message.timeStamp} - {message.event} - {message.args[0]}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </Context.Provider>
  );
}

export default App;
