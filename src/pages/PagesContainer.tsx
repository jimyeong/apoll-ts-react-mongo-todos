import React from "react";
import { isToken, deleteToken } from "../storage/localStorage";
import PublicPage from "./PublicPage/PublicPage";
import WrapperContainer from "../ui/components/Layouts/Containers/WrapperContainer";
import MainPage from "./Main/MainPage";
import TodosPage from "./Todos/TodosPage";
import { useAppContext } from "./App/context/appContext";

const PagesContainer = ({ children }: React.PropsWithChildren) => {
  const { appContextState, updateContextState, navigate } = useAppContext();

  return (
    <React.Fragment>
      {!appContextState.token && <PublicPage />}
      {appContextState.token && (
        <WrapperContainer>
          <MainPage />
          <TodosPage />
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
