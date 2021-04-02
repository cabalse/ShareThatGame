import React, { useState } from "react";

const DEFAULT_NAVIGATION = "main";

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
};

export const Context = React.createContext<StoreType>(storeDefault);

const useContextStore = (): StoreType => {
  const [conInfo, setConInfo] = useState<ConnectionInfoType>(
    connectionInfoDefault
  );
  return {
    connectionInformation: conInfo,
    setConnectionInformation: setConInfo,
  };
};

export default useContextStore;
