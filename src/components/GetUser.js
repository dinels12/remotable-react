// @ts-expect-error
import React, { Component } from "react";
import axios from "axios";
import Expired from "./Expired";
import NotFoundOpen from "./NotFoundOpen";
import NotFoundClose from "./NotFoundClose";
import { development, production, token, register } from "../environment";
let web = development;
if (process.env.NODE_ENV === "production") {
  web = production;
}
// 5e737df650fb650032e31bae

export default class GetUser extends Component {
  state = {
    _id: "",
    message: "Consultar",
    redirect: false,
    expired: false,
    notFound: false,
  };

  constructor(props) {
    super(props);
    this.message = React.createRef();
  }

  onChange = (e) => {
    this.setState({ _id: e.target.value });
  };

  componentDidMount() {
    this.cleanCache();
    let id = localStorage.getItem("_id");
    if (id) {
      this.setState({ _id: id, redirect: true });
    }
  }

  messageError() {
    this.message.current.classList.remove("btn-primary");
    this.message.current.classList.add("btn-danger");
  }

  cleanCache() {
    localStorage.removeItem("_id");
    localStorage.removeItem("hours");
    localStorage.removeItem("payout");
    localStorage.removeItem("loading");
    localStorage.removeItem("update");
    localStorage.removeItem("metric");
    localStorage.removeItem("cache");
  }

  messageLoading() {
    this.message.current.classList.remove("btn-danger");
    this.message.current.classList.remove("btn-primary");
    this.message.current.classList.add("btn-info");
  }

  messageSuccess() {
    this.message.current.classList.remove("btn-danger");
    this.message.current.classList.remove("btn-primary");
    this.message.current.classList.remove("btn-info");
    this.message.current.classList.add("btn-success");
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ message: "Cargando" });
    this.messageLoading();
    const id = this.state._id;
    if (id.length === 24) {
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
              localStorage.removeItem("_id");
              this.setState({ expired: true, message: message });
              return this.messageError();
            }
            if (message === "Usuario no encontrado.") {
              localStorage.removeItem("_id");
              this.setState({ notFound: true, message: message });
              return this.messageError();
            } else {
              localStorage.removeItem("_id");
              this.setState({ message: message });
              return this.messageError();
            }
          }
        });
      if (res) {
        if (res.data.user) {
          const user = res.data.user;
          this.messageSuccess();
          this.setState({ message: "Usuario existente" });
          localStorage.setItem("_id", user._id);
          window.location.reload();
        } else if (localStorage.getItem("_id") === "undefined") {
          localStorage.removeItem("_id");
          window.location.reload();
        } else {
          this.setState({
            message: "ID Invalido por favor contactar a soporte.",
          });
          return this.messageError();
        }
      }
    } else {
      this.setState({ message: "Por favor ingresa un ID valido" });
      return this.messageError();
    }
  };

  notFoundHide() {
    this.setState({ notFound: false });
    localStorage.removeItem("_id");
    window.location.href = "/plans";
  }

  expiredHide() {
    this.setState({ expired: false });
    localStorage.removeItem("_id");
    window.location.href = "/plans";
  }

  render() {
    const { expired, notFound } = this.state;

    return (
      <div>
        <div id='formConsult' className='col-6 m-auto'>
          {expired ? (
            <Expired
              show={expired}
              onHide={() => {
                this.expiredHide();
              }}
            />
          ) : null}
          {notFound ? (
            register === "open" ? (
              <NotFoundOpen
                show={notFound}
                onHide={() => this.notFoundHide()}
              />
            ) : (
              <NotFoundClose
                show={notFound}
                onHide={() => this.notFoundHide()}
              />
            )
          ) : null}
          <div className='card remoColor'>
            <div className='card-header'>
              <h1>Consultar la tabla</h1>
            </div>
            <div className='card-body'>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <label htmlFor='usrId'></label>
                  Introduzca su ID
                  <input
                    id='usrId'
                    name='id'
                    type='text'
                    onChange={this.onChange}
                    value={this.state._id}
                    className='form-control'
                    placeholder='Here:)'
                    autoFocus
                    required
                  />
                </div>
                <button
                  ref={this.message}
                  className='btn btn-primary btn-block'
                  type='submit'
                >
                  {this.state.message}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
