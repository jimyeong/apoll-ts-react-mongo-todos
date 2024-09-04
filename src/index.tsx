import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App";
import reportWebVitals from "./reportWebVitals";
import { httpLink } from "./pages/apollo/HTTPLinks";
import { errorLink } from "./pages/apollo/ErrorLink";
import { socketLink } from "./pages/apollo/SocketLink";
import AppContextProvider from "./pages/App/context/appContext";

import { onError } from "@apollo/client/link/error";

import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

// 1. import `ChakraProvider` component

import {
  ApolloClient,
  gql,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER,
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink, socketLink]),
  credentials: "include",
});

// login flow, router, google api
const API = `${process.env.REACT_APP_CLIENT_ID}`;

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
