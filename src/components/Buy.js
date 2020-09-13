import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
const { development, production, token } = require("../environment");
let web = development;
if (process.env.NODE_ENV === "production") {
  web = production;
}

export default class Buy extends Component {
  state = {
    show: true,
    amount: "",
    id: "",
    transaction_id: "",
  };

  componentDidMount() {
    this.setState({ show: this.props.show });
    if (this.props.data.plan === 1) {
      this.setState({ amount: 1 });
    }
    if (this.props.data.plan === 2) {
      this.setState({ amount: 5 });
    }
    if (this.props.data.plan === 3) {
      this.setState({ amount: 9 });
    }
  }

  onHide(plan, buy, message) {
    if (plan && buy) {
      this.props.onHide(`plan${this.props.data.plan}Show`, buy, message);
    } else {
      this.props.onHide(`plan${this.props.data.plan}Show`);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { id, transaction_id, amount } = this.state;
    if (id.length === 24) {
      const data = {
        id,
        transaction_id,
        amount,
      };

      const res = await axios
        .post(`${web}/api/premium/buy`, data, {
          headers: { token: token },
        })
        .catch((err) => {
          const message = err.response.data.message;
          if (err) {
            if (message === "Membresia Vigente") {
              localStorage.setItem("_id", id);
              window.location.reload();
            }
          }
        });
      if (res) {
        const message = res.data.message;
        this.setState({
          id: "",
          transaction_id: "",
        });
        this.onHide(`plan${this.props.plan}Show`, true, message);
      } else {
      }
      this.setState({ message: "Por favor ingresa un ID valido" });
    }
  };

  render() {
    const { plan } = this.props.data;
    const { amount } = this.state;

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
            <div>Plan {plan}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Para obtener esta membresia tienes que pagar{" "}
            <strong>${amount}</strong> por <strong>Airtm</strong> a este correo:{" "}
            <strong>dinels12@gmail.com</strong>
          </p>
          <p>
            <strong>
              <mark>
                Luego tienes que escribir tu ID en el formulario de abajo, y el
                ID de transacción de Airtm.
              </mark>
            </strong>
          </p>
          <p>
            <small className='text-muted'>
              Recuerda colocar el ID en la nota de Airtm.
            </small>
          </p>
          <Form onSubmit={this.onSubmit}>
            <Row>
              <Col>
                <Form.Label>ID</Form.Label>
                <Form.Control
                  value={this.state.id}
                  name='id'
                  onChange={this.onChange}
                  required
                />
              </Col>
              <Col>
                <Form.Label>ID de transacción</Form.Label>
                <Form.Control
                  value={this.state.transaction_id}
                  name='transaction_id'
                  onChange={this.onChange}
                  required
                />
              </Col>
              <Col className='mt-auto'>
                <Button type='submit'>Enviar</Button>
              </Col>
            </Row>
          </Form>

          <p>
            <small>
              <em>
                <mark>
                  Un agente de soporte te avisara via email cuando recibamos el
                  pago.
                </mark>
              </em>
            </small>
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
          <Button onClick={() => this.onHide()}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
