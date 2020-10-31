import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PayoutInterface } from "../interface";

interface Props {
  logout: any;
  status: string;
  history: PayoutInterface[];
}

const NavBarTop = (props: Props) => {
  const { status, history, logout } = props;

  return (
    <Navbar className='navBarColor d-block' expand='lg' fixed='top'>
      <div className='d-flex justify-content-between align-items-center'>
        {status === "Online" ? (
          <Link
            to={{
              pathname: "/history",
              state: { history },
            }}
            className='btn btn-secondary'
          >
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
          <Button variant='success' className='text-white'>
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
};

export default NavBarTop;
