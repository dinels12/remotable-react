import React, { Component } from "react";
import axios from "axios";

export default class GetUser extends Component {
  state = {
    _id: "",
    message: "Consultar",
    loading: true,
  };

  constructor(props) {
    super(props);
    this.message = React.createRef();
  }

  onChange = (e) => {
    this.setState({ _id: e.target.value });
  };

  componentDidMount() {
    let id = localStorage.getItem("_id");
    if (id) {
      this.setState({ _id: id });
      window.location.href = "/user";
    }
  }

  messageError() {
    this.message.current.classList.remove("btn-primary");
    this.message.current.classList.add("btn-danger");
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

    const res = await axios
      .get("https://desition.herokuapp.com/api/user/" + this.state._id)
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          this.setState({ message: message });
          this.messageError();
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error: ", err.message);
        }
      });
    if (res) {
      this.messageSuccess();
      this.setState({ message: "Usuario Conseguido" });
      localStorage.setItem("_id", res.data._id);
      window.location.reload();
    }
  };

  render() {
    return (
      <div id='formConsult' className='col-6 m-auto'>
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
    );
  }
}
