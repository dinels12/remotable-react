import React, { Component } from "react";
import { Link } from "react-router-dom";
import Stats from "./Charts";
import { Button } from "react-bootstrap";
import { PayoutInterface } from "../interface";

interface State {
  history: PayoutInterface[];
  quality: any;
  speed: any;
  hours: any;
  total: any;
  show: boolean;
  selected: any;
  loading: boolean;
  nameSelected: string;
}

export default class UserStats extends Component {
  state: State = {
    history: [],
    quality: [],
    speed: [],
    hours: [],
    total: [],
    show: false,
    selected: [],
    loading: true,
    nameSelected: "",
  };

  componentDidMount() {
    this.setState({
      history: JSON.parse(localStorage.getItem("history") || "[]"),
    });
    // @ts-ignore
    this.update = setInterval(() => {
      this.setState({
        quality: this.getQuality(),
        speed: this.getSpeed(),
        hours: this.getHours(),
        total: this.getTotal(),
      });
    }, 100);
  }

  componentWillUnmount() {
    // @ts-ignore
    clearInterval(this.update);
  }

  getQuality() {
    const { history } = this.state;
    return history.map((data: any) => {
      return { x: new Date(parseFloat(data.date)), y: data.quality };
    });
  }

  getSpeed() {
    const { history } = this.state;
    return history.map((data: any) => {
      return { x: new Date(parseFloat(data.date)), y: data.speed };
    });
  }

  getHours() {
    const { history } = this.state;
    return history.map((data: any) => {
      return { x: new Date(parseFloat(data.date)), y: data.hours };
    });
  }

  getTotal() {
    const { history } = this.state;
    return history.map((data: any) => {
      return { x: new Date(parseFloat(data.date)), y: data.total };
    });
  }

  selectType = (name: string) => {
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
      <div className='container'>
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
