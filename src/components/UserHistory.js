import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const { development, production, token } = require("../environment");
let web = development;
if (process.env.NODE_ENV === "production") {
  web = production;
}
// 5e737df650fb650032e31bae

export default class UserHistory extends Component {
  state = {
    history: [],
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
  }

  render() {
    const { history } = this.state;
    return (
      <div id={this.state._id} className='container'>
        <div className='row'>
          <div id='hoursTable' className='col m-auto'>
            <div className='card remoColor'>
              <div className='card-header d-flex justify-content-between align-content-center'>
                <Link to='/' className='btn btn-secondary'>
                  Volver
                </Link>
                <Link to='/stats' className='btn btn-secondary'>
                  Estadisticas
                </Link>
                <button className='btn btn-info'>
                  Semanas: {this.state.history.length}
                </button>
              </div>
              <div id='preShow' className='card-body'>
                <div id='SHOW' className='card remoColor'>
                  <div className='container'>
                    <div className='row'>
                      {history.map((data) => (
                        <div key={data._id} className='col-md-4 mt-2 mb-2'>
                          <Card className='remoColor2'>
                            <Card.Header className='text-'>
                              <h1 className='h4'>{data.payout}</h1>
                            </Card.Header>
                            <Card.Body>
                              <div
                                className='d-flex justify-content-between align-items-center'
                                style={{ fontSize: "1.2em" }}
                              >
                                <div>Horas</div>
                                <div>
                                  <i className='far fa-clock'></i> {data.hours}
                                </div>
                              </div>
                              <hr />
                              <div
                                className='d-flex justify-content-between align-items-center'
                                style={{ fontSize: "1.2em" }}
                              >
                                {data.quality >= 5 ? (
                                  <div>
                                    C{" "}
                                    <i className='fas fa-thumbs-up text-success'></i>{" "}
                                    {data.quality}
                                  </div>
                                ) : (
                                  <div>
                                    C{" "}
                                    <i className='fas fa-thumbs-down text-danger'></i>{" "}
                                    {data.quality}
                                  </div>
                                )}
                                {data.speed >= 5 ? (
                                  <div>
                                    V{" "}
                                    <i className='fas fa-fast-forward text-success'></i>{" "}
                                    {data.speed}
                                  </div>
                                ) : (
                                  <div>
                                    V{" "}
                                    <i className='fas fa-fast-backward text-danger'></i>{" "}
                                    {data.speed}
                                  </div>
                                )}
                              </div>
                              <hr />
                              <div
                                className='d-flex justify-content-between align-items-center'
                                style={{ fontSize: "1.05em" }}
                              >
                                {data.extra > 0 ? (
                                  <div>
                                    Extra <i className='fas fa-dollar-sign'></i>
                                    {data.extra}
                                  </div>
                                ) : null}

                                {data.bonus > 0 ? (
                                  <div>
                                    Bono <i className='fas fa-dollar-sign'></i>
                                    {data.bonus}
                                  </div>
                                ) : null}
                              </div>
                              {data.bonus || data.extra > 0 ? <hr /> : null}
                              <div
                                className='text-center mt-2'
                                style={{ fontSize: "1.5em" }}
                              >
                                Total <i className='fas fa-dollar-sign'></i>
                                {data.total}
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
