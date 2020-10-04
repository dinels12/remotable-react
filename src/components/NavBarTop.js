import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NavBarTop extends Component {
  render() {
    const { statusCheck, status, logout } = this.props;

    return (
      <Navbar className='navBarColor d-block' expand='lg' fixed='top'>
        <div className='d-flex justify-content-between align-items-center'>
          {status === "Online" ? (
            <Link to='/history' className='btn btn-secondary'>
              Historial de pagos
            </Link>
          ) : status === "Offline" ? (
            <Button variant='danger'>Error de red</Button>
          ) : (
            <Button variant='info' className='text-white'>
              Cargando
            </Button>
          )}
          <button className='btn btn-danger' onClick={logout}>
            Salir
          </button>
          {status ? (
            <Button ref={statusCheck} variant='danger' className='text-white'>
              {status}
            </Button>
          ) : (
            <Button variant='info' className='text-white'>
              Cargando
            </Button>
          )}
        </div>
      </Navbar>
    );
  }
}
