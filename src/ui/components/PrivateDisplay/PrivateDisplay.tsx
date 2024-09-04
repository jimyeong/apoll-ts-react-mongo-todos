import React from "react";
import { isLogin } from "../../../storage/localStorage";

const PrivateDisplay = ({ children }: React.PropsWithChildren) => {
  if (isLogin() == "1") return <React.Fragment>{children}</React.Fragment>;
  return null;
};

export default PrivateDisplay;
