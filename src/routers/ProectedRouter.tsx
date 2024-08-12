import { Route } from "react-router-dom";
import { isLogin } from "../storage/localStorage";
import { Navigate } from "react-router-dom";
import React, { FunctionComponent, ReactElement } from "react";

interface IProtectedRouter extends React.PropsWithChildren {
  Component: ReactElement;
}

const ProtectedRouter = ({
  children,
  Component,
  ...rest
}: IProtectedRouter) => {
  const auth = isLogin();
  console.log("@@isAuthenticated", isLogin());
  if (auth === "1") return Component;
  return <Navigate to="/login" />;
};

export default ProtectedRouter;
