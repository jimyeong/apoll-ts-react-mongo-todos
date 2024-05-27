import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
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

const API = `${process.env.REACT_APP_CLIENT_ID}`;
console.log("@@@API, ", API);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GoogleOAuthProvider clientId={API}>
        <ApolloProvider client={client}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ApolloProvider>
      </GoogleOAuthProvider>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
