import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es-us";

export default class Anuncio extends Component {
  onHide() {
    this.props.onHide(true);
  }

  render() {
    return (
      <Modal
        {...this.props}
        size='lg'
        centered
        show
        aria-labelledby='contained-modal-title-vcenter'
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            <div>{this.props.list.title}</div>
            <div className='text-black-50 author'>{this.props.list.author}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {this.props.list.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <div>{moment(this.props.list.date).format("LL")}</div>
          <Button onClick={this.props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
