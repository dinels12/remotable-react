import axios from "axios";
import React, { Component } from "react";
import { Spinner, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Anuncio from "./Anuncio";
// import UserData from "./UserData";
import "../App.css";
import { VictoryPie, VictoryLabel } from "victory";
import Expired from "./Expired";
import NotFound from "./NotFound";
const { development, production, token } = require("../environment");
let web = development;
if (process.env.NODE_ENV === "production") {
  web = production;
}
// 5e737df650fb650032e31bae

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
    expired: false,
    notFound: false,
    data: {},
    gestion: false,
  };

  constructor(props) {
    super(props);
    this.statusCheck = React.createRef();
  }

  async componentDidMount() {
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
            const message = err.response.data.message;
            if (message === "Membresia Expirada") {
              localStorage.removeItem("hours");
              localStorage.removeItem("update");
              localStorage.removeItem("payout");
              localStorage.removeItem("metric");
              return this.setState({
                message: message,
                loading: true,
                expired: true,
              });
            } else if (message === "Usuario no encontrado.") {
              localStorage.removeItem("hours");
              localStorage.removeItem("update");
              localStorage.removeItem("payout");
              localStorage.removeItem("metric");
              return this.setState({
                message: message,
                loading: true,
                notFound: true,
              });
            }
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
      if (res) {
        const user = res.data.user;
        const data = res.data.data;
        if (user._id) {
          document.body.classList.remove("bg-success");
          this.setState({
            _id: user._id,
            Hours: this.dot(user.Hours),
            update: user.update,
            payout: "$" + this.dot(user.Hours * 0.5),
            loading: false,
            metric: this.por(user.Hours),
            anuncios: user.anuncios,
            annoucements: {
              title: user.annoucements[0].title,
              body: user.annoucements[0].body,
              author: user.annoucements[0].author,
              extra: user.annoucements[0].extra,
              number: user.annoucements[0].number,
              urgent: user.annoucements[0].urgent,
              date: user.annoucements[0].date,
            },
            status: "Online",
            data: data,
          });
          if (user.lastWeek[0]) {
            this.setState({
              total: `$${user.lastWeek[0].total}`,
              lastWeek: {
                bonus: user.lastWeek[0].bonus,
                extra: user.lastWeek[0].extra,
                hours: this.dot(user.lastWeek[0].hours),
                quality: user.lastWeek[0].quality,
                speed: user.lastWeek[0].speed,
                payout: user.lastWeek[0].payout,
                total: user.lastWeek[0].total,
              },
            });
          }

          localStorage.setItem("hours", this.state.Hours);
          localStorage.setItem("payout", this.state.payout);
          localStorage.setItem("loading", this.state.loading);
          localStorage.setItem("update", this.state.update);
          localStorage.setItem("metric", this.state.metric);
          this.statusOn();
        } else if (localStorage.getItem("_id") === "undefined") {
          localStorage.removeItem("_id");
          window.location.reload();
        }
      }
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
    this.statusCheck.current.classList.remove("btn-danger");
    this.statusCheck.current.classList.add("btn-success");
  }

  onHide = async (valor) => {
    this.setState({ anuncios: valor });

    const id = this.state._id;

    await axios.put(`${web}/api/annoucements/${id}`);
  };

  logout = () => {
    const conf = window.confirm("Cerrar sesion?");
    if (conf) {
      localStorage.removeItem("_id");
      localStorage.removeItem("hours");
      localStorage.removeItem("payout");
      localStorage.removeItem("loading");
      localStorage.removeItem("update");
      localStorage.removeItem("metric");
      window.location.reload();
    }
  };

  notFoundHide() {
    this.setState({ notFound: false });
    localStorage.removeItem("_id");
    window.location.reload();
  }

  expiredHide() {
    this.setState({ expired: false });
    localStorage.removeItem("_id");
    window.location.reload();
  }

  gestionHide() {
    this.setState({ gestion: false });
  }

  render() {
    const {
      loading,
      anuncios,
      annoucements,
      expired,
      notFound,
      // gestion,
      // data,
      lastWeek,
    } = this.state;

    if (loading) {
      document.body.classList.add("bg-success");
      return (
        <div id='hello' className='hello'>
          {expired ? (
            <Expired show={expired} onHide={() => this.expiredHide()} />
          ) : null}
          {notFound ? (
            <NotFound show={notFound} onHide={() => this.notFoundHide()} />
          ) : null}
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
        {/* {gestion ? (
          <UserData
            show={gestion}
            data={data}
            onHide={() => this.gestionHide()}
          />
        ) : null} */}
        <div className='row'>
          <div id='hoursTable' className='col m-auto'>
            <div className='card remoColor'>
              <div className='card-header d-flex justify-content-between align-content-center'>
                {/* <Button
                  onClick={() => {
                    this.setState({ gestion: true });
                  }}
                >
                  Gestionar mi suscripción
                </Button> */}

                <Link to='/history' className='btn btn-secondary'>
                  Historial de pagos
                </Link>
                <button className='btn btn-danger' onClick={this.logout}>
                  Salir
                </button>
                <Button ref={this.statusCheck} className='text-white'>
                  {this.state.status}
                </Button>
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
                      <div className='m-auto respM380'>
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
                    <div className='col-md-4'>
                      <Card style={{ color: "black" }}>
                        <Card.Header className='d-flex justify-content-between align-items-center'>
                          <div className='h4'>{lastWeek.payout}</div>
                        </Card.Header>
                        <Card.Body>
                          <div
                            className='d-flex justify-content-between align-items-center'
                            style={{ fontSize: "1.2em" }}
                          >
                            <div>Horas</div>
                            <div>
                              <i className='far fa-clock'></i> {lastWeek.hours}
                            </div>
                          </div>
                          <hr />
                          <div
                            className='d-flex justify-content-between align-items-center'
                            style={{ fontSize: "1.2em" }}
                          >
                            {lastWeek.quality >= 5 ? (
                              <div className='text-success'>
                                C <i className='fas fa-thumbs-up'></i>{" "}
                                {lastWeek.quality}
                              </div>
                            ) : (
                              <div className='text-danger'>
                                C <i className='fas fa-thumbs-down'></i>{" "}
                                {lastWeek.quality}
                              </div>
                            )}
                            {lastWeek.speed >= 5 ? (
                              <div className='text-success'>
                                V <i className='fas fa-fast-forward'></i>{" "}
                                {lastWeek.speed}
                              </div>
                            ) : (
                              <div className='text-danger'>
                                V <i className='fas fa-fast-backward'></i>{" "}
                                {lastWeek.speed}
                              </div>
                            )}
                          </div>
                          <hr />
                          <div
                            className='d-flex justify-content-between align-items-center'
                            style={{ fontSize: "1.05em" }}
                          >
                            {lastWeek.extra > 0 ? (
                              <div>
                                Extra <i className='fas fa-dollar-sign'></i>
                                {lastWeek.extra}
                              </div>
                            ) : null}

                            {lastWeek.bonus > 0 ? (
                              <div>
                                Bono <i className='fas fa-dollar-sign'></i>
                                {lastWeek.bonus}
                              </div>
                            ) : null}
                          </div>
                          {lastWeek.bonus || lastWeek.extra > 0 ? <hr /> : null}
                          <div
                            className='text-center mt-2'
                            style={{ fontSize: "1.5em" }}
                          >
                            Total <i className='fas fa-dollar-sign'></i>
                            {lastWeek.total}
                          </div>
                        </Card.Body>
                      </Card>
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
