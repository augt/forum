import { createContext, Dispatch, SetStateAction } from "react";

export const ConnectedUserContext = createContext<{
  connectedUser: any;
  setConnectedUser: any;
  isUserConnected: boolean;
  setIsUserConnected: any;
  authToken: string | undefined;
  setAuthToken: any;
}>({
  connectedUser: {},
  setConnectedUser: {},
  isUserConnected: false,
  setIsUserConnected: false,
  authToken: undefined,
  setAuthToken: undefined,
});
