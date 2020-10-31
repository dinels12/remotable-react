import React from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

interface Props {
  show: boolean;
  onHide: any;
  message: string;
}

const BuySuccesful = (props: Props) => {
  return (
    <Modal
      size='lg'
      centered
      show={props.show}
      onHide={() => props.onHide("buyState")}
      aria-labelledby='contained-modal-title-vcenter'
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <div>Compra Exitosa!</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <div>{moment(Date.now()).format("LL")}</div>
        <Button onClick={() => props.onHide("buyState")}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuySuccesful;
