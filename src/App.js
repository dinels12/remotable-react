import React from "react";
import "./App.css";
import UserInfo from "./components/User";
import "bootstrap/dist/css/bootstrap.min.css";
import GetUser from "./components/GetUser";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  let sesion = localStorage.getItem("_id");
  if (sesion) {
    return (
      <Router>
        <Route path='/' exact component={UserInfo} />
      </Router>
    );
  } else {
    return (
      <Router>
        <Route path='/' exact component={GetUser} />
      </Router>
    );
  }
}

export default App;
