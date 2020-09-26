import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Stats from "./Charts";
import { Button } from "react-bootstrap";
const { development, production, token } = require("../environment");
let web = development;
if (process.env.NODE_ENV === "production") {
  web = production;
}

export default class UserStats extends Component {
  state = {
    history: [],
    quality: [],
    speed: [],
    hours: [],
    total: [],
    show: false,
    selected: [],
  };

  async componentDidMount() {
    const id = localStorage.getItem("_id");
    const res = await axios
      .get(`${web}/api/user/payouts/${id}`, {
        headers: { token: token },
      })
      .catch((err) => {
        if (err) return console.log("Error");
      });
    if (res) {
      this.setState({ history: res.data });
    }
    setTimeout(() => {
      this.setState({
        quality: this.getQuality(),
        speed: this.getSpeed(),
        hours: this.getHours(),
        total: this.getTotal(),
      });
    }, 1000);
  }

  getQuality() {
    const { history } = this.state;
    return history.map((data) => {
      return { x: new Date(data.date), y: data.quality };
    });
  }

  getSpeed() {
    const { history } = this.state;
    return history.map((data) => {
      return { x: new Date(data.date), y: data.speed };
    });
  }

  getHours() {
    const { history } = this.state;
    return history.map((data) => {
      return { x: new Date(data.date), y: data.hours };
    });
  }

  getTotal() {
    const { history } = this.state;
    return history.map((data) => {
      return { x: new Date(data.date), y: data.total };
    });
  }

  selectType = (name) => {
    const { hours, quality, speed, total } = this.state;
    if (name === "hours") {
      this.setState({ selected: hours, nameSelected: "Horas" });
    }
    if (name === "quality") {
      this.setState({ selected: quality, nameSelected: "Calidad" });
    }
    if (name === "speed") {
      this.setState({ selected: speed, nameSelected: "Velocidad" });
    }
    if (name === "total") {
      this.setState({ selected: total, nameSelected: "Total" });
    }
  };

  render() {
    const { show } = this.state;
    return (
      <div id={this.state._id} className='container'>
        <div className='row'>
          <div id='hoursTable' className='col m-auto'>
            <div className='card remoColor'>
              <div className='card-header d-flex justify-content-between align-content-center'>
                <Link to='/history' className='btn btn-secondary'>
                  Volver
                </Link>

                <Button
                  onClick={() => {
                    this.selectType("hours");
                    this.setState({ show: true });
                  }}
                >
                  Horas
                </Button>
                <Button
                  onClick={() => {
                    this.selectType("quality");
                    this.setState({ show: true });
                  }}
                >
                  Calidad
                </Button>
                <Button
                  onClick={() => {
                    this.selectType("speed");
                    this.setState({ show: true });
                  }}
                >
                  Velocidad
                </Button>
                <Button
                  onClick={() => {
                    this.selectType("total");
                    this.setState({ show: true });
                  }}
                >
                  Total
                </Button>
              </div>
              <div id='preShow' className='card-body'>
                {show ? (
                  <Stats
                    data={this.state.selected}
                    name={this.state.nameSelected}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
