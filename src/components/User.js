import axios from "axios";
import React, { Component } from "react";
import "../App.css";
import { Spinner } from "react-bootstrap";
import { VictoryPie, VictoryLabel } from "victory";

export default class User extends Component {
  state = {
    _id: "",
    Hours: "",
    update: "",
    lastWeek: [{}],
    payout: "",
    total: "",
    loading: true,
    metric: 0,
  };

  async componentDidMount() {
    const id = localStorage.getItem("_id");
    this.setState({ _id: id });
    if (id) {
      const res = await axios
        .get("https://desition.herokuapp.com/api/user/" + id)
        .catch((err) => {
          if (err) {
            window.location.reload();
          }
        });
      document.body.classList.remove("bg-success");
      this.setState({
        _id: res.data._id,
        Hours: this.dot(res.data.Hours),
        update: res.data.update,
        lastWeek: res.data.lastWeek[0],
        payout: "$" + this.dot(res.data.Hours * 0.5),
        loading: false,
        metric: this.por(res.data.Hours),
        total: this.dot(
          res.data.lastWeek[0].hours * 0.5 +
            res.data.lastWeek[0].bonus +
            res.data.lastWeek[0].extra
        ),
      });
    } else window.location.reload();
  }

  dot(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  por(x) {
    return (x / 40) * 100;
  }

  render() {
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

    return (
      <div id={this.state._id} className='container'>
        <div className='row'>
          <div id='hoursTable' className='col m-auto'>
            <div className='card remoColor'>
              <div className='card-header'>
                <h1>Remotask Plus</h1>
              </div>
              <div id='preShow' className='card-body'>
                <div id='SHOW' className='card remoColor'>
                  <div className='card-header'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='m-auto'>
                        <div className='container'>
                          <div id='actualPayout' className='text-center fontS'>
                            {this.state.payout}
                          </div>
                          <div className='text-center fontP'>PAGO</div>
                        </div>
                      </div>
                      <div className='m-auto'>
                        <div className='container'>
                          <div className='fontS'>
                            <svg width={200} height={200}>
                              <VictoryPie
                                standalone={false}
                                animate={{ duration: 1000 }}
                                width={200}
                                height={200}
                                data={[
                                  { key: "", y: this.state.metric },
                                  { key: "", y: 100 - this.state.metric },
                                ]}
                                innerRadius={70}
                                labels={() => null}
                                colorScale={["#19B3A6", "#EEEEEE"]}
                              />
                              <VictoryLabel
                                textAnchor='middle'
                                verticalAnchor='middle'
                                x={100}
                                y={100}
                                text={this.state.Hours}
                                style={{ fontSize: 35 }}
                              />
                            </svg>
                          </div>
                          <div className='text-center fontP'>HORAS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body'>
                    <div>
                      <div className='card remoColor'>
                        <div className='card-header'>
                          <div className='d-flex justify-content-between align-items-center'>
                            <h4>Pago:</h4>
                            <h4 id='lastweekP'>
                              {" "}
                              {this.state.lastWeek.payout}{" "}
                            </h4>
                          </div>
                        </div>
                        <div className='card-body'>
                          <div className='alert alert-secondary'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div id='hours' className='mr-auto pr-2 fontw'>
                                {this.dot(this.state.lastWeek.hours)}
                                <br />
                                <span>Horas</span>
                              </div>
                              <div id='quality' className='mr-auto pr-2 fontw'>
                                {this.state.lastWeek.quality}
                                <br />
                                <span>Calidad</span>
                              </div>
                              <div id='speed' className='mr-auto pr-2 fontw'>
                                {this.state.lastWeek.speed}
                                <br />
                                <span>Velocidad</span>
                              </div>
                              <div id='bonus' className='mr-auto pr-2 fontw'>
                                {this.state.lastWeek.bonus}
                                <br />
                                <span>Bono</span>
                              </div>
                              <div id='extra' className='mr-auto pr-2 fontw'>
                                {this.state.lastWeek.extra}
                                <br />
                                <span>Extra</span>
                              </div>
                              <div id='total' className='mr-auto pr-2 fontw'>
                                {this.dot(this.state.total)}
                                <br />
                                <span>Total</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-footer'>
                <div className='d-flex justify-content-between align-items-center'>
                  <h5>Ultima actualizacion:</h5>
                  <h5 className='timeago' id='update'>
                    {this.state.update}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
