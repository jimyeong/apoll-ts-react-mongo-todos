import React from "react";
import SignInPage from "../SignIn/SignInPage";
import TodosPage from "../Todos/TodosPage";
import WrapperContainer from "../../ui/components/Layouts/Containers/WrapperContainer";
import { isLogin } from "../../storage/localStorage";

const PublicPage = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <span>You can access any pages in this page </span>{" "}
      {isLogin() !== "1" && (
        <div>
          <SignInPage />
        </div>
      )}
      <WrapperContainer>
        <TodosPage />
      </WrapperContainer>
    </div>
  );
};
export default PublicPage;
