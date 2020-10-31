import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  invalid: number;
  skip: number;
  sqb: number;
}

const BtnMod = (props: Props) => {
  const [show, setShow] = useState(false);

  const status = localStorage.getItem("state");
  const { invalid, skip, sqb } = props;
  if (show) {
    return (
      <Modal
        size='lg'
        centered
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby='contained-modal-title-vcenter'
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Otras Horas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col'>
              <p>Horas no enviadas {invalid}</p>
            </div>
            <div className='col'>
              <p>Horas de SKIP {skip}</p>
            </div>
            <div className='col'>
              <p>Horas de SBQ {sqb}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
          <Button onClick={() => setShow(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  if (status === "on") {
    return (
      <Button
        className='text-center'
        variant='info'
        onClick={() => setShow(true)}
      >
        HORAS
      </Button>
    );
  }

  return (
    <Button className='text-center' variant='info'>
      HORAS
    </Button>
  );
};

export default BtnMod;
