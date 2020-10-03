import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class BtnMod extends Component {
  state = {
    show: false,
    hours: 0,
    invalid: 0,
    skip: 0,
    sqb: 0,
  };

  componentDidMount() {
    this.update = setInterval(() => {
      this.getHours();
    }, 100);
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }
  getHours = () => {
    const { invalid, skip, sqb } = this.props;
    this.setState({ invalid: invalid, skip: skip, sqb: sqb });
  };

  onHide() {
    this.setState({ show: false });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  render() {
    const { show, invalid, skip, sqb } = this.state;
    if (show) {
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
            <Button onClick={() => this.onHide()}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return (
      <Button
        className='text-center fontP'
        variant='info'
        onClick={this.showModal}
      >
        HORAS
      </Button>
    );
  }
}
