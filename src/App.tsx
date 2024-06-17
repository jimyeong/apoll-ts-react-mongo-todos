import React, { useState } from "react";

import MainPage from "./pages/Main/MainPage";
import FriendsPage from "./pages/Friends/FriendsPage";
import TodosPage from "./pages/Todos/TodosPage";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./pages/Todos/ui";
import SeachingBar from "./ui/components/SearchingBars/SearchingBar";
import styled from "styled-components";
import WrapperContainer from "./ui/components/Layouts/Containers/WrapperContainer";
import { useEffect } from "react";
import { isToken, setToken, deleteToken } from "./storage/localStorage";
import SignInPage from "./pages/SignIn/SignInPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PublicPage from "./pages/PublicPage/PublicPage";
import PagesContainer from "./pages/PagesContainer";

const AppUIBlock = styled.div`
  position: relative;
`;

function App() {
  const [appState, setAppState] = useState<{ user: null | any }>({
    user: null,
  });

  useEffect(() => {
    console.log("@@executed?");
    const onLogout = (e: StorageEvent) => {
      console.log("@@hi,");
      if (e.key == "token" && e.newValue == null) {
        console.log("@@excuted");
        window.location.reload();
      }
    };
    // listeners
    window.addEventListener("storage", onLogout);
    return () => {
      window.removeEventListener("storage", onLogout);
    };
  }, []);

  useEffect(() => {
    if (!isToken()) {
    }

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
