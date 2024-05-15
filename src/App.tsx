import React from "react";
import Main from "./pages/Main";
import FriendsPage from "./pages/Friends/FriendsPage";
import TodosPage from "./pages/Todos/TodosPage";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        {/* <Main /> */}

        <FriendsPage />
        <TodosPage />
      </div>
    </ChakraProvider>
  );
}

export default App;
