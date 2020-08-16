import React from "react";
import "./App.css";
import UserInfo from "./components/User";
import "bootstrap/dist/css/bootstrap.min.css";
import GetUser from "./components/GetUser";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  let sesion = localStorage.getItem("_id");

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {sesion ? <UserInfo /> : <GetUser />}
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
