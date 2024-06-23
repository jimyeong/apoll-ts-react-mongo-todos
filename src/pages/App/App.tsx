import React, { useState } from "react";

import MainPage from "../Main/MainPage";
import FriendsPage from "../Friends/FriendsPage";
import TodosPage from "../Todos/TodosPage";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "../Todos/ui";
import SeachingBar from "../../ui/components/SearchingBars/SearchingBar";
import styled from "styled-components";
import WrapperContainer from "../../ui/components/Layouts/Containers/WrapperContainer";
import { useEffect, useReducer } from "react";
import { isToken, setToken, deleteToken } from "../../storage/localStorage";
import SignInPage from "../SignIn/SignInPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PublicPage from "../PublicPage/PublicPage";
import PagesContainer from "../PagesContainer";
import MainReducer from "./reducers/MainReducer";
import { appInitialState } from "./reducers/MainReducer";
import AppContextProvider from "./context/appContext";

const AppUIBlock = styled.div`
  position: relative;
`;
AppUIBlock as React.ReactNode;
function App() {
  const [appState, appDispatch] = useReducer(MainReducer, appInitialState);

  useEffect(() => {
    const onLogout = (e: StorageEvent) => {
      if (e.key == "token" && e.newValue == null) {
        window.location.reload();
      }
    };
    // listeners
    window.addEventListener("storage", onLogout);
    return () => {
      window.removeEventListener("storage", onLogout);
    };
  }, []);
  console.log("@@@Appstate", appState);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <ChakraProvider>
      <AppUIBlock className="App">
        <PagesContainer />
      </AppUIBlock>
    </ChakraProvider>
  );
}

export default App;
