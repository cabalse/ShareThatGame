import "./App.css";

import { Col, Container, Row } from "react-bootstrap";
import { ConnectionInfoType, Context } from "./../../context";
import LogIn, { LogInInformation } from "../LogIn";

import Header from "../Header";
import useServerConnect from "./../../hooks/useServerConnect";
import useStoreContext from "./../../context";

function App() {
  const ctx = useStoreContext();
  const [logIn, messages, message] = useServerConnect();
  const handleLogIn = (logInInfo: LogInInformation) => {
    logIn(logInInfo, () => {
      console.log("Loggin in");
      ctx.setConnectionInformation(
        (prevState: ConnectionInfoType): ConnectionInfoType => {
          return {
            ...prevState,
            userName: "Kalle Anka",
            gameRoom: "Ankeborg",
          };
        }
      );
    });
  };
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
            <LogIn
              onLogin={(logInInfo: LogInInformation) => handleLogIn(logInInfo)}
            />
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
