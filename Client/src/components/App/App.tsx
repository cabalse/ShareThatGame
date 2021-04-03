import "./App.css";

import { Context, STATUS } from "./../../context";

import Header from "../Header";
import InitInformation from "../InitInformation";
import LogIn from "../LogIn";
import MainArea from "../MainArea";
import useServerConnect from "./../../hooks/useServerConnect";
import useStoreContext from "./../../context";

function App() {
  const ctx = useStoreContext();
  const [logIn, messages, message] = useServerConnect();

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
    <Context.Provider value={ctx}>
      {switchRender(ctx.status)}
      <Header />
      <MainArea />
    </Context.Provider>
  );
}

export default App;
