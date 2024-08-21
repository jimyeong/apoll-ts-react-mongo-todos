import React, { Reducer, ReducerAction, ReducerState } from "react";

// study this code
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum Types {
  SET_TOKEN = "MAIN_SET_TOKEN",
  LOG_OUT = "LOG_OUT",
  LOG_IN = "LOG_IN",
}
// when loggined, set context status, so it becomes conncected to the appState
export type AppMainPayload = {
  [Types.SET_TOKEN]: string;
  [Types.LOG_OUT]: boolean;
  [Types.LOG_IN]: boolean;
};

export type TypeInitialState = {
  token: null | string;
  login: boolean;
};
export const appInitialState: TypeInitialState = {
  token: null,
  login: false,
};
const MainReducer: Reducer<
  TypeInitialState,
  ActionMap<AppMainPayload>[keyof ActionMap<AppMainPayload>]
> = (prevState, action) => {
  switch (action.type) {
    case Types.SET_TOKEN: {
      return {
        ...prevState,
        token: action.payload,
      };
    }
    case Types.LOG_IN: {
      return {
        ...prevState,
        login: true,
      };
    }
    case Types.LOG_OUT: {
      console.log("excueted logout");
      return {
        ...prevState,
        login: false,
      };
    }
    default:
      return prevState;
  }
};

export default MainReducer;
