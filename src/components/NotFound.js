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
            <div>Registros Cerrados!</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Registros cerrados, los usuarios ya registrados podran seguir
            accediendo a la aplicacion.
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
