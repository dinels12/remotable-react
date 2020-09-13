import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

export default class Expired extends Component {
  state = {
    show: true,
  };

  componentDidMount() {
    this.setState({ show: this.props.show });
  }

  onHide() {
    this.props.onHide();
  }

  render() {
    return (
      <Modal
        size='lg'
        centered
        show={this.state.show}
        onHide={() => this.onHide()}
        aria-labelledby='contained-modal-title-vcenter'
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            <div>Membresia Expirada</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Hola, para poder usar esta aplicacion, te invito a renovar tu
            membresia.
          </p>
          <p>
            Para renovar la membresia tienes que ir a la seccion de planes y
            escoger el que mejor te agrade.
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
                  Si tienes una duda o pregunta acerca de la plataforma, el
                  equipo de RemoTable esta activo.
                </strong>
              </mark>
            </small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div>{moment(Date.now()).format("LL")}</div>
          <Button onClick={() => this.onHide()}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
