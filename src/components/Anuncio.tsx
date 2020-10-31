import React from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es-us";
import { AnuncioInterface } from "../interface";

interface Props {
  onHide: any;
  list: AnuncioInterface;
  show: boolean;
}

const Anuncio = (props: Props) => {
  return (
    <Modal
      size='lg'
      centered
      onHide={props.onHide}
      show={props.show}
      aria-labelledby='contained-modal-title-vcenter'
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <div>{props.list.title}</div>
          <div className='text-black-50 author'>{props.list.author}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.list.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <div>{moment(parseFloat(props.list.date)).format("LL")}</div>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Anuncio;
