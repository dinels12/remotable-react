import axios from "axios";
import React, { Component } from "react";
import { Spinner, Table } from "react-bootstrap";
import Anuncio from "./Anuncio";
import "../App.css";
import { VictoryPie, VictoryLabel } from "victory";

export default class User extends Component {
  state = {
    _id: "",
    Hours: "",
    update: "",
    lastWeek: {},
    payout: "",
    total: "",
    loading: true,
    metric: 0,
    status: "Offline",
    annoucements: {},
    anuncios: false,
  };

  constructor(props) {
    super(props);
    this.statusCheck = React.createRef();
  }

  async componentDidMount() {
    const id = localStorage.getItem("_id");
    this.setState({ _id: id });
    if (id) {
      // const res = await axios.get(`http://localhost:4000/api/user/${id}`);
      const res = await axios
        .get(`https://desition.herokuapp.com/api/user/${id}`)
        .catch((err) => {
          if (err) {
            this.setState({
              _id: localStorage.getItem("_id"),
              Hours: localStorage.getItem("hours"),
              update: localStorage.getItem("update"),
              payout: localStorage.getItem("payout"),
              loading: false,
              metric: localStorage.getItem("metric"),
            });
            this.statusOff();
          }
        });

      document.body.classList.remove("bg-success");
      this.setState({
        _id: res.data._id,
        Hours: this.dot(res.data.Hours),
        update: res.data.update,
        lastWeek: {
          bonus: "$" + res.data.lastWeek[0].bonus,
          extra: "$" + res.data.lastWeek[0].extra,
          hours: this.dot(res.data.lastWeek[0].hours),
          quality: res.data.lastWeek[0].quality,
          speed: res.data.lastWeek[0].speed,
          payout: res.data.lastWeek[0].payout,
          total: res.data.lastWeek[0].total,
        },
        payout: "$" + this.dot(res.data.Hours * 0.5),
        loading: false,
        metric: this.por(res.data.Hours),
        total: `$${res.data.lastWeek[0].total}`,
        anuncios: res.data.anuncios,
        annoucements: {
          title: res.data.annoucements[0].title,
          body: res.data.annoucements[0].body,
          author: res.data.annoucements[0].author,
          extra: res.data.annoucements[0].extra,
          number: res.data.annoucements[0].number,
          urgent: res.data.annoucements[0].urgent,
          date: res.data.annoucements[0].date,
        },
        status: "Online",
      });
      localStorage.setItem("hours", this.state.Hours);
      localStorage.setItem("payout", this.state.payout);
      localStorage.setItem("loading", this.state.loading);
      localStorage.setItem("update", this.state.update);
      localStorage.setItem("metric", this.state.metric);
      this.statusOn();
    } else window.location.reload();
  }

  dot(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  por(x) {
    return (x / 40) * 100;
  }

  statusOff() {
    this.statusCheck.current.classList.remove("text-success");
    this.statusCheck.current.classList.add("text-danger");
  }

  statusOn() {
    this.statusCheck.current.classList.remove("text-danger");
    this.statusCheck.current.classList.add("text-success");
  }

  onHide = async (valor) => {
    this.setState({ anuncios: valor });

    const id = this.state._id;

    await axios.put(`https://desition.herokuapp.com/api/annoucements/${id}`);
  };

  logout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("hours");
    localStorage.removeItem("payout");
    localStorage.removeItem("loading");
    localStorage.removeItem("update");
    localStorage.removeItem("metric");
    window.location.href = "/";
  };

  render() {
    const { loading, anuncios, annoucements } = this.state;

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
        {anuncios ? (
          <Anuncio
            show={anuncios}
            list={annoucements}
            onHide={() => this.onHide(false)}
          />
        ) : null}
        <div className='row'>
          <div id='hoursTable' className='col m-auto'>
            <div className='card remoColor'>
              <div className='card-header d-flex justify-content-between align-content-center'>
                <h3>Remotask Plus</h3>
                <button className='btn btn-danger' onClick={this.logout}>
                  Salir
                </button>
                <span ref={this.statusCheck} className='text-danger'>
                  {this.state.status}
                </span>
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
                            <h4 id='lastweekP'>{this.state.lastWeek.payout}</h4>
                          </div>
                        </div>
                        <div style={{ padding: 0 }} className='card-body'>
                          <Table
                            responsive='sm'
                            striped
                            bordered
                            hover
                            variant='dark'
                            size='sm'
                          >
                            <thead>
                              <tr>
                                <th className='text-center'>Horas</th>
                                <th className='text-center'>Calidad</th>
                                <th className='text-center'>Speed</th>
                                <th className='text-center'>Bonus</th>
                                <th className='text-center'>Extra</th>
                                <th className='text-center'>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='text-center'>
                                  {this.state.lastWeek.hours}
                                </td>
                                <td className='text-center'>
                                  {this.state.lastWeek.quality}
                                </td>
                                <td className='text-center'>
                                  {this.state.lastWeek.speed}
                                </td>
                                <td className='text-center'>
                                  {this.state.lastWeek.bonus}
                                </td>
                                <td className='text-center'>
                                  {this.state.lastWeek.extra}
                                </td>
                                <td className='text-center'>
                                  {this.state.total}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
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
