import React from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

interface Props {
  show: boolean;
  onHide: any;
}

export const NotFoundOpen = (props: Props) => {
  return (
    <Modal
      size='lg'
      centered
      show={props.show}
      onHide={() => props.onHide()}
      aria-labelledby='contained-modal-title-vcenter'
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <div>Unete a la comunidad de RemoTable!</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Para poder usar esta aplicacion tienes que tener una membresia por
          cada ID.
        </p>
        <p>
          <small>
            <mark>
              Horario de soporte:{" "}
              <strong>8:00 am a 5:00 pm Lunes a Viernes</strong>
            </mark>
          </small>
        </p>
        <p>
          <small>
            <mark>
              <strong>
                Si tienes una duda o pregunta acerca de la plataforma, el equipo
                de RemoTable esta activo.
              </strong>
            </mark>
          </small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div>{moment(Date.now()).format("LL")}</div>
        <Button onClick={() => props.onHide()}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const NotFoundClose = (props: Props) => {
  return (
    <Modal
      size='lg'
      centered
      show={props.show}
      onHide={() => props.onHide()}
      aria-labelledby='contained-modal-title-vcenter'
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <div>Registros Cerrados!</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Por los momentos tenemos los registros cerrados.</p>
      </Modal.Body>
      <Modal.Footer>
        <div>{moment(Date.now()).format("LL")}</div>
        <Button onClick={() => props.onHide()}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};
