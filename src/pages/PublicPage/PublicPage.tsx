import React from "react";
import SignInPage from "../SignIn/SignInPage";

const PublicPage = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <span>You can access any pages in this page </span> <SignInPage />
    </div>
  );
};
export default PublicPage;
