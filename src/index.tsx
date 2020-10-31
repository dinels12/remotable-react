import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { app, Analytics } from "./FirebaseConfig";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { development, production } from "./environment";
let uri = development;
if (process.env.NODE_ENV === "production") {
  uri = production;
}
app();
Analytics();

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ServiceWorker
// @ts-ignore
serviceWorker.unregister();
