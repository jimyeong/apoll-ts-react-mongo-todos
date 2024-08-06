import React from "react";
import PublicPage from "./PublicPage/PublicPage";
import WrapperContainer from "../ui/components/Layouts/Containers/WrapperContainer";
import MainPage from "./Main/MainPage";
import TodosPage from "./Todos/TodosPage";
import { useAppContext } from "./App/context/appContext";
import { isLogin } from "../storage/localStorage";

const PagesContainer = ({ children }: React.PropsWithChildren) => {
  const { appContextState, updateContextState, navigate } = useAppContext();

  return (
    <React.Fragment>
      {isLogin() !== "1" && <PublicPage />}
      {isLogin() == "1" && (
        <WrapperContainer>
          <MainPage />
        </WrapperContainer>
      )}

      {/* 
      <button
        onClick={() => {
          deleteToken();
        }}
      >
        delete token
      </button> */}
    </React.Fragment>
  );
};

export default PagesContainer;
