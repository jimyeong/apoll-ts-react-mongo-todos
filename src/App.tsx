import React from "react";

import MainPage from "./pages/Main/MainPage";
import FriendsPage from "./pages/Friends/FriendsPage";
import TodosPage from "./pages/Todos/TodosPage";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./pages/Todos/ui";
import SeachingBar from "./ui/components/SearchingBars/SearchingBar";
import styled from "styled-components";
import WrapperContainer from "./ui/components/Layouts/Containers/WrapperContainer";

const AppUIBlock = styled.div`
  position: relative;
`;

function App() {
  return (
    <ChakraProvider>
      <AppUIBlock className="App">
        <WrapperContainer>
          <FriendsPage />
          <TodosPage />
          <MainPage />
        </WrapperContainer>
      </AppUIBlock>
    </ChakraProvider>
  );
}

export default App;
