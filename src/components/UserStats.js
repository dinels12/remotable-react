import React, { Component } from "react";
import { Link } from "react-router-dom";
import Stats from "./Charts";
import { Button } from "react-bootstrap";

export default class UserStats extends Component {
  state = {
    history: [],
    quality: [],
    speed: [],
    hours: [],
    total: [],
    show: false,
    selected: [],
    loading: true,
  };

  componentDidMount() {
    this.setState({ history: this.props.history });
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
    clearInterval(this.update);
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
