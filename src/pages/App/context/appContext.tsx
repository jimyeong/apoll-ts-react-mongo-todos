import React, {
  ReactElement,
  createContext,
  useContext,
  useReducer,
} from "react";
import { appInitialState } from "../reducers/MainReducer";
import { NavigateFunction, useNavigate } from "react-router-dom";
import MainReducer, { TypeInitialState } from "../reducers/MainReducer";
import { Types, ActionMap, AppMainPayload } from "../reducers/MainReducer";

export const appContext = createContext<{
  appContextState: TypeInitialState;
  updateContextState: React.Dispatch<any>;
  navigate: NavigateFunction;
}>({
  appContextState: appInitialState,
  updateContextState: () => null,
  navigate: () => null,
});

export const useAppContext = () => {
  const contextValue = useContext(appContext);
  if (!contextValue) {
    throw Error("this context is supposed to be used within AppContext");
  }
  return contextValue;
};
export default function AppContextProvider(props: React.PropsWithChildren) {
  const navigate = useNavigate();
  const [appContextState, appContextDispatch] = useReducer(
    MainReducer,
    appInitialState
  );
  const updateContextState = (
    action: ActionMap<AppMainPayload>[keyof ActionMap<AppMainPayload>]
  ) => {
    appContextDispatch(action);
  };
  return (
    <appContext.Provider
      {...props}
      value={{ appContextState, updateContextState, navigate }}
    />
  );
}
