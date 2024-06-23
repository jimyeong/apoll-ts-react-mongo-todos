import React, { Reducer, ReducerAction, ReducerState } from "react";

// study this code
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum Types {
  SET_TOKEN = "MAIN_SET_TOKEN",
}
export type AppMainPayload = {
  [Types.SET_TOKEN]: string;
};

export type TypeInitialState = {
  token: null | string;
};
export const appInitialState: TypeInitialState = {
  token: null,
};
const MainReducer: Reducer<
  TypeInitialState,
  ActionMap<AppMainPayload>[keyof ActionMap<AppMainPayload>]
> = (prevState, action) => {
  switch (action.type) {
    case Types.SET_TOKEN: {
      return {
        token: action.payload,
      };
    }
    default:
      return prevState;
  }
};

export default MainReducer;
