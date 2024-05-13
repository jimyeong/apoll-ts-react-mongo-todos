import React from "react";
import Main from "./pages/Main";
import FriendsPage from "./pages/Friends/FriendsPage";
import TodosPage from "./pages/Todos/TodosPage";

function App() {
  return (
    <div className="App">
      {/* <Main /> */}

      <FriendsPage />
      <TodosPage />
    </div>
  );
}

export default App;
