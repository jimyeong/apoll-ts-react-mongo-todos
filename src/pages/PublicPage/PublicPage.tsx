import React, { useEffect } from "react";
import SignInPage from "../SignIn/SignInPage";
import TodosPage from "../Todos/TodosPage";
import WrapperContainer from "../../ui/components/Layouts/Containers/WrapperContainer";
import { isLogin } from "../../storage/localStorage";
import { useAppContext } from "../App/context/appContext";

const PublicPage = ({ children }: React.PropsWithChildren) => {
  const { appContextState, updateContextState, navigate } = useAppContext();
  useEffect(() => {
    // uxpdateContextState({ type: "LOG_OUT" });
  }, []);
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
