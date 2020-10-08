import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import moment from "moment";

export default class NavbarBottom extends Component {
  render() {
    const update = localStorage.getItem("update")
      ? localStorage.getItem("update")
      : "Cargando";
    return (
      <Navbar className='navBarColor d-block' expand='lg' fixed='bottom'>
        <div className='d-flex justify-content-between align-items-center'>
          <h5>Ultima actualizacion:</h5>
          <h5 className='timeago' id='update'>
            {update === "Cargando" ? null : moment(update).fromNow()}
          </h5>
        </div>
      </Navbar>
    );
  }
}
