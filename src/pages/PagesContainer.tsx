import React from "react";
import PublicPage from "./PublicPage/PublicPage";
import WrapperContainer from "../ui/components/Layouts/Containers/WrapperContainer";
import MainPage from "./Main/MainPage";
import TodosPage from "./Todos/TodosPage";
import { useAppContext } from "./App/context/appContext";
import { isLogin } from "../storage/localStorage";
import { Routes, Route } from "react-router-dom";
import { ProtectedRouter } from "../routers";

const PagesContainer = ({ children }: React.PropsWithChildren) => {
  const { appContextState, updateContextState, navigate } = useAppContext();

  return (
    <React.Fragment>
      <WrapperContainer>
        <Routes>
          <Route path="/login" element={<PublicPage />} />
          <Route
            path="/"
            element={<ProtectedRouter Component={<MainPage />} />}
          />
        </Routes>
      </WrapperContainer>
    </React.Fragment>
  );
};

export default PagesContainer;
