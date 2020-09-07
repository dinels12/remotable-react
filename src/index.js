import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { app, Analytics } from "./FirebaseConfig";
app();
Analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// ServiceWorker
serviceWorker.register();

// Proxima actualizacion, subscripcion de pago, y mejoras en el rendimiento, backup en tiempo real, etc
