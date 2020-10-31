import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserInfo from "./components/User";
import Calculator from "./components/Calculator";
import Prices from "./components/Prices";
import GetUser from "./components/GetUser";
import UserHistory from "./components/UserHistory";
import UserStats from "./components/UserStats";
import Navbar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("_id")) {
      setLogin(false);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return null;
  }

  if (!login) {
    document.body.classList.add("bg-success");
    localStorage.setItem("status", "Online");

    return (
      <Router>
        <Switch>
          <Route exact path='/' component={UserInfo} />
          <Route path='/history' component={UserHistory} />
          <Route path='/stats' component={UserStats} />
          <Redirect to='/' />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={GetUser} />
        <Route path='/calculator' component={Calculator} />
        <Route path='/plans' component={Prices} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
};

export default App;
