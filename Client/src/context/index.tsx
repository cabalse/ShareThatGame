import React, { useState } from "react";

export enum NAVIGATION {
  DEFAULT = "main",
}

export enum STATUS {
  LOGIN = "login",
  INIT = "init",
  ADMIN = "admin",
  GAME = "game",
}

export type ConnectionInfoType = {
  administrator: boolean;
  connected: boolean;
  connectionID: string;
  userName: string;
  gameRoom: string;
};

export type StoreType = {
  connectionInformation: ConnectionInfoType;
  setConnectionInformation: React.Dispatch<
    React.SetStateAction<ConnectionInfoType>
  >;
  status: STATUS;
  setStatus: React.Dispatch<React.SetStateAction<STATUS>>;
  selectedNavigation: NAVIGATION;
  setSelectedNavigation: React.Dispatch<React.SetStateAction<NAVIGATION>>;
  alive: string;
  setAlive: React.Dispatch<React.SetStateAction<string>>;
};

const connectionInfoDefault = {
  administrator: false,
  connected: false,
  connectionID: "",
  userName: "",
  gameRoom: "",
};

const storeDefault = {
  connectionInformation: connectionInfoDefault,
  setConnectionInformation: () => null,
  status: STATUS.LOGIN,
  setStatus: () => null,
  selectedNavigation: NAVIGATION.DEFAULT,
  setSelectedNavigation: () => null,
  alive: "0",
  setAlive: () => null,
};

export const Context = React.createContext<StoreType>(storeDefault);

const useContextStore = (): StoreType => {
  const [conInfo, setConInfo] = useState<ConnectionInfoType>(
    connectionInfoDefault
  );
  const [status, setStatus] = useState<STATUS>(STATUS.LOGIN);
  const [selectedNavigation, setSelectedNavigation] = useState<NAVIGATION>(
    NAVIGATION.DEFAULT
  );
  const [alive, setAlive] = useState<string>("");
  return {
    connectionInformation: conInfo,
    setConnectionInformation: setConInfo,
    status: status,
    setStatus: setStatus,
    selectedNavigation: selectedNavigation,
    setSelectedNavigation: setSelectedNavigation,
    alive: alive,
    setAlive: setAlive,
  };
};

export default useContextStore;
