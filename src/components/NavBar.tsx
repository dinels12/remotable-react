import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className="remoColor">
      <div className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">RemoTable</Navbar.Brand>
        <Nav>
          <NavLink to="/" className="nav-link">
            Consultar
          </NavLink>
          <NavLink to="/calculator" className="nav-link">
            Calculadora
          </NavLink>
          {/* <NavLink to="/plans" className="nav-link">
            Planes
          </NavLink> */}
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
