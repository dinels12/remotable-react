import axios from "axios";
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Anuncio from "./Anuncio";
import NavbarBottom from "./NavbarBottom";
import NavBarTop from "./NavBarTop";
import BtnMod from "./BtnMod";
import "../App.css";
import { VictoryPie, VictoryLabel } from "victory";
import Expired from "./Expired";
import NotFound from "./NotFound";

const { development, production } = require("../environment");
let web = development;
if (process.env.NODE_ENV === "production") {
  web = production;
}

export default class User extends Component {
  state = {
    _id: "",
    Hours: 0,
    update: "",
    lastWeek: {},
    payout: "$0.00",
    total: "",
    loading: true,
    metric: 0,
    status: undefined,
    annoucements: {},
    anuncios: false,
    expired: false,
    notFound: false,
    gestion: false,
  };

  constructor(props) {
    super(props);
    this.statusCheck = React.createRef();
  }

  componentDidMount() {
    this.updateT = setTimeout(() => {
      this.updateI = setInterval(() => {
        this.getUser();
      }, 1000);
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.updateT);
    clearInterval(this.updateI);
  }

  getUser = () => {
    const { res, error, status, anuncios } = this.props;
    if (error) {
      const message = error;
      if (message === "Membresia Expirada") {
        localStorage.removeItem("hours");
        localStorage.removeItem("update");
        localStorage.removeItem("payout");
        localStorage.removeItem("metric");
        localStorage.removeItem("_id");
        return this.setState({
          message: message,
          expired: true,
        });
      } else if (message === "Usuario no encontrado.") {
        localStorage.removeItem("hours");
        localStorage.removeItem("update");
        localStorage.removeItem("payout");
        localStorage.removeItem("metric");
        localStorage.removeItem("_id");
        return this.setState({
          message: message,
          notFound: true,
        });
      } else if (message === "Error de red") {
      }
    }
    if (status) {
      if (status === "on") {
        this.statusOn();
      } else if (status === "off") {
        this.statusOff();
      }
    }

    const id = localStorage.getItem("_id");
    this.setState({ _id: id, loading: false });

    let user = res.user;

    this.setState({
      _id: user._id,
      Hours: this.dot(user.Hours),
      invalid: user.invalid,
      skip: user.skip,
      sqb: user.sqb,
      update: user.update_at,
      payout: "$" + this.dot(user.Hours * 0.5),
      loading: false,
      metric: this.por(user.Hours),
      anuncios: anuncios,
      annoucements: {
        title: user.annoucements[0].title,
        body: user.annoucements[0].body,
        author: user.annoucements[0].author,
        extra: user.annoucements[0].extra,
        number: user.annoucements[0].number,
        urgent: user.annoucements[0].urgent,
        date: user.annoucements[0].date,
      },
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
    localStorage.setItem("hours", user.Hours);
    localStorage.setItem("update", user.update_at);
  };

  dot(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  por(x) {
    return (x / 40) * 100;
  }

  statusOff() {
    this.setState({ status: "Offline" });
    this.statusCheck.current.classList.remove("btn-success");
    this.statusCheck.current.classList.add("btn-danger");
  }

  statusOn() {
    this.setState({ status: "Online" });
    this.statusCheck.current.classList.remove("btn-danger");
    this.statusCheck.current.classList.add("btn-success");
  }

  onHide = async () => {
    const id = this.state._id;

    await axios.put(`${web}/api/annoucements/${id}`);
    this.props.updateUser();
    this.setState({ anuncios: false });
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
      anuncios,
      annoucements,
      expired,
      notFound,
      lastWeek,
      status,
    } = this.state;

    return (
      <div className='mst'>
        {anuncios ? (
          <Anuncio
            show={anuncios}
            list={annoucements}
            onHide={() => this.onHide()}
          />
        ) : null}
        {expired ? (
          <Expired show={expired} onHide={() => this.expiredHide()} />
        ) : null}
        {notFound ? (
          <NotFound show={notFound} onHide={() => this.notFoundHide()} />
        ) : null}

        <NavBarTop
          logout={() => this.logout()}
          statusCheck={this.statusCheck}
          status={this.state.status}
        />

        <div className='card newCard'>
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
                      <div className='text-center'>
                        <BtnMod
                          invalid={this.state.invalid}
                          skip={this.state.skip}
                          sqb={this.state.sqb}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <div className='col-md-12'>
                  {status === "Online" ? (
                    <Card className='remoColor2'>
                      <Card.Header className='d-flex justify-content-between align-items-center'>
                        <div className='h4'>{lastWeek.payout}</div>
                      </Card.Header>
                      <Card.Body>
                        <div
                          style={{ fontSize: "1.2em" }}
                          className='d-flex justify-content-between align-items-center'
                        >
                          <div>
                            Horas <i className='far fa-clock'></i>{" "}
                            {lastWeek.hours}
                          </div>
                          {lastWeek.quality >= 5 ? (
                            <div>
                              Calidad{" "}
                              <i className='fas fa-thumbs-up text-success'></i>{" "}
                              {lastWeek.quality}
                            </div>
                          ) : (
                            <div>
                              Calidad{" "}
                              <i className='fas fa-thumbs-down text-danger'></i>{" "}
                              {lastWeek.quality}
                            </div>
                          )}
                          {lastWeek.speed >= 5 ? (
                            <div>
                              Velocidad{" "}
                              <i className='fas fa-thumbs-up text-success'></i>{" "}
                              {lastWeek.speed}
                            </div>
                          ) : (
                            <div>
                              Velocidad{" "}
                              <i className='fas fa-thumbs-down text-danger'></i>{" "}
                              {lastWeek.speed}
                            </div>
                          )}
                        </div>
                        <hr />
                        <div
                          className='d-flex justify-content-between align-items-center'
                          style={{ fontSize: "1.2em" }}
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
                          <div>
                            Total <i className='fas fa-dollar-sign'></i>
                            {lastWeek.total}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottom update={this.state.update} />
      </div>
    );
  }
}
