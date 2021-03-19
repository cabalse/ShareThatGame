import React, { useState } from "react";

const DEFAULT_NAVIGATION = "main";

export type store = {
  selectedNavigation: string;
  setSelectedNavigation: (arg: string) => void;
};

export const Context = React.createContext<store>({
  selectedNavigation: DEFAULT_NAVIGATION,
  setSelectedNavigation: (arg: string) => null,
});

export function useContextStore(): store {
  const [selectedNavigation, setSelectedNavigation] = useState(
    DEFAULT_NAVIGATION
  );
  return {
    selectedNavigation: selectedNavigation,
    setSelectedNavigation: setSelectedNavigation,
  };
}
