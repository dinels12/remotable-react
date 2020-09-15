import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

export default class notFound extends Component {
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
            <div>Unete a la comunidad de RemoTable!</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            <strong>
              <mark>
                <em>
                  <div>Solo por Septiembre!</div>
                  <div>
                    Paga $3 y te regalamos 1 mes de membresia, serian 4 meses de
                    membresia por el precio de $3!
                  </div>
                </em>
              </mark>
            </strong>
          </h4>
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
