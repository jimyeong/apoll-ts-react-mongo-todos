import React from "react";
import { isToken, deleteToken } from "../storage/localStorage";
import PublicPage from "./PublicPage/PublicPage";
import WrapperContainer from "../ui/components/Layouts/Containers/WrapperContainer";
import MainPage from "./Main/MainPage";
import TodosPage from "./Todos/TodosPage";

const PagesContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <React.Fragment>
      {!isToken() && <PublicPage />}
      {isToken() && (
        <WrapperContainer>
          <MainPage />
          <TodosPage />
        </WrapperContainer>
      )}

      <button
        onClick={() => {
          deleteToken();
        }}
      >
        delete token
      </button>
    </React.Fragment>
  );
};

export default PagesContainer;
