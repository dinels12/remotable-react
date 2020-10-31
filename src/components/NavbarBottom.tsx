import React from "react";
import { Navbar } from "react-bootstrap";
import moment from "moment";

interface Props {
  update: string;
}

const NavbarBottom = (props: Props) => {
  const update = props.update
    ? new Date(parseInt(props.update))
    : localStorage.getItem("updateAt");
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
};

export default NavbarBottom;
