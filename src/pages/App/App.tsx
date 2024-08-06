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
    return () => {};
  }, []);

  return (
    <ChakraProvider>
      <AppUIBlock className="App">
        <Header />
        <PagesContainer />
      </AppUIBlock>
    </ChakraProvider>
  );
}

export default App;
