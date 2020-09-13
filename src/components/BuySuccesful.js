import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

export default class BuySuccesful extends Component {
  state = {
    show: true,
  };

  componentDidMount() {
    this.setState({ show: this.props.show });
  }

  onHide() {
    this.props.onHide("buyState");
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
            <div>Compra Exitosa!</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <div>{moment(Date.now()).format("LL")}</div>
          <Button onClick={() => this.onHide()}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
