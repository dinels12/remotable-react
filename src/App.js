import React from "react";
import "./App.css";
import UserInfo from "./components/User";
import Calculator from "./components/ Calculator";
import Prices from "./components/Prices";
import "bootstrap/dist/css/bootstrap.min.css";
import GetUser from "./components/GetUser";
import Navbar from "./components/NavBar";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  let sesion = localStorage.getItem("_id");
  if (!sesion) {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <GetUser />
          </Route>
          <Route path='/calculator'>
            <Calculator />
          </Route>
          {/* <Route path='/plans'>
            <Prices />
          </Route> */}
          <Redirect to='/' />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <UserInfo />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
