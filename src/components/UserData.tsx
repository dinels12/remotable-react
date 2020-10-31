import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es";

interface Props {
  onHide: any;
  data: any;
  show: boolean;
}

const UserData = (props: Props) => {
  return (
    <Modal
      size='lg'
      centered
      show={props.show}
      onHide={() => props.onHide()}
      aria-labelledby='contained-modal-title-vcenter'
    >
      <Modal.Header closeButton>
        <Modal.Title
          id='contained-modal-title-vcenter'
          style={{ fontWeight: "bold" }}
        >
          RemoTable Premium
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h4>Próximo pago</h4>
            <div className='text-muted'>FECHA</div>
            <div>{moment(props.data.expired_date).format("L")}</div>
            <br />
            <div className='text-muted'>CANTIDAD</div>
            <div>$1</div>
          </Col>
          <Col>
            <h4>Último recibo</h4>
            <div style={{ fontWeight: "bold" }}>RemoTable Premium</div>
            <div className='text-muted'>${props.data.amount}</div>
            <div className='text-muted'>
              {moment(props.data.date_pay).format("L")}
            </div>
            <br />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <div>Fecha de expiración: {props.data.expired}</div>
        <Button onClick={() => props.onHide()}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserData;
