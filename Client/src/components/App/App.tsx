import "./App.css";

import { Col, Container, Row } from "react-bootstrap";
import { Context, STATUS } from "./../../context";

import Header from "../Header";
import InitInformation from "../InitInformation";
import LogIn from "../LogIn";
import MainArea from "../MainArea";
import useServerConnect from "./../../hooks/useServerConnect";
import useStoreContext from "./../../context";

function App() {
  const ctx = useStoreContext();
  const messageBroker = (type: string, message: string) => {
    ctx.setAlive(message);
  };
  const [logIn, messages, message] = useServerConnect(messageBroker);

  const switchRender = (key: STATUS) => {
    switch (key) {
      case STATUS.LOGIN:
        return <LogIn logIn={logIn} />;
      case STATUS.INIT:
        return <InitInformation />;
      default:
        return null;
    }
  };

  return (
    <Container fluid={true} className="noPadding">
      <Row noGutters>
        <Col>
          <Context.Provider value={ctx}>
            {switchRender(ctx.status)}
            <Header />
            <MainArea />
          </Context.Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
