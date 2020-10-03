import React, { Component } from "react";
import "./App.css";
import UserInfo from "./components/User";
import Calculator from "./components/ Calculator";
// import Prices from "./components/Prices";
import "bootstrap/dist/css/bootstrap.min.css";
import GetUser from "./components/GetUser";
import UserHistory from "./components/UserHistory";
import UserStats from "./components/UserStats";
import Navbar from "./components/NavBar";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
const { development, production, token } = require("./environment");
let web = development;
if (process.env.NODE_ENV === "production") {
  web = production;
}

export default class App extends Component {
  state = {
    data: [],
    history: [],
    loading: true,
  };

  componentDidMount() {
    this.getUser();
    this.userHistory();
  }

  getUser = async () => {
    const id = localStorage.getItem("_id");
    this.setState({ _id: id });

    if (id) {
      const res = await axios
        .get(`${web}/api/premium/${id}`, {
          headers: {
            token: token,
          },
        })
        .catch((err) => {
          if (err) {
            document.body.classList.remove("bg-success");
            document.body.classList.add("bgColor");
            this.setState({
              data: {
                user: {
                  _id: localStorage.getItem("_id"),
                  Hours: localStorage.getItem("hours"),
                  update_at: localStorage.getItem("update"),
                  payout: localStorage.getItem("payout"),
                  metric: localStorage.getItem("metric"),
                  annoucements: [
                    {
                      title: "",
                      body: "",
                      author: "Admin",
                      extra: "",
                      number: 0,
                    },
                  ],
                  anuncios: false,
                  invalid: 0,
                  lastWeek: [],
                  skip: 0,
                  sqb: 0,
                },
              },
              status: "off",
              loading: false,
            });
            return this.setState({ error: "Error de red" });
          }
          const message = err.response.data.message;
          this.setState({ error: message });
        });
      if (res) {
        document.body.classList.remove("bg-success");
        document.body.classList.add("bgColor");
        this.setState({ loading: false, data: res.data, status: "on" });
      }
    } else {
      this.setState({ loading: false });
    }
  };

  userHistory = async () => {
    const id = localStorage.getItem("_id");
    if (id) {
      const res = await axios
        .get(`${web}/api/user/payouts/${id}`, {
          headers: { token: token },
        })
        .catch((err) => {
          if (err) return console.error("Error al obtener los datos");
        });
      if (res) {
        this.setState({ history: res.data });
      }
    }
  };

  render() {
    let sesion = localStorage.getItem("_id");
    const { loading } = this.state;
    if (loading) {
      document.body.classList.add("bg-success");
      return (
        <div id='hello' className='hello'>
          <div className='row'>
            <div className='col'>
              <h1
                className='text-white text-center'
                style={{ fontSize: "100px" }}
              >
                Hello:)
                <br />
              </h1>
              <div className='text-center text-white'>
                <Spinner animation='border' role='status' />
              </div>
            </div>
          </div>
        </div>
      );
    }
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
    if (!this.state.loading) {
      return (
        <Router>
          <Switch>
            <Route exact path='/'>
              <UserInfo
                res={this.state.data}
                loading={this.state.loading}
                error={this.state.error}
                status={this.state.status}
              />
            </Route>
            <Route path='/history'>
              <UserHistory history={this.state.history} />
            </Route>
            <Route path='/stats'>
              <UserStats history={this.state.history} />
            </Route>
            <Redirect to='/' />
          </Switch>
        </Router>
      );
    } else {
      return null;
    }
  }
}
