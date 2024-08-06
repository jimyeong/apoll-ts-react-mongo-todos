import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App";
import reportWebVitals from "./reportWebVitals";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import LoginSuccessPage from "./pages/SignIn/LoginSuccessPage";
import AppContextProvider from "./pages/App/context/appContext";

import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

// 1. import `ChakraProvider` component

import {
  ApolloClient,
  gql,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER,
  cache: new InMemoryCache(),
});

// login flow, router, google api
const API = `${process.env.REACT_APP_CLIENT_ID}`;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ApolloProvider client={client}>
//         <AppContextProvider>
//           <ColorModeScript initialColorMode={theme.config.initialColorMode} />
//           <App />
//         </AppContextProvider>
//       </ApolloProvider>
//     ),
//   },
//   {
//     path: "/logined",
//     element: (
//       <ApolloProvider client={client}>
//         <AppContextProvider>
//           <ColorModeScript initialColorMode={theme.config.initialColorMode} />
//           <App />
//           <LoginSuccessPage />
//         </AppContextProvider>
//       </ApolloProvider>
//     ),
//   },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <Router>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
