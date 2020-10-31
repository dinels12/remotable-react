import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface Props {
  show: boolean;
  data: {
    plan: number;
  };
  onHide: any;
}

const Buy = (props: Props) => {
  const [amount, setAmount] = useState(0);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (props.data.plan === 1) {
      setAmount(1);
    }
    if (props.data.plan === 2) {
      setAmount(5);
    }
    if (props.data.plan === 3) {
      setAmount(9);
    }
  }, [props.data.plan]);

  const onHide = (plan?: number, buy?: any, message?: string) => {
    if (plan && buy) {
      props.onHide(`plan${props.data.plan}Show`, buy, message);
    } else {
      props.onHide(`plan${props.data.plan}Show`);
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    // const { id, transaction_id, amount } = this.state;
    // if (id.length === 24) {
    //   const data = {
    //     id,
    //     transaction_id,
    //     amount,
    //   };

    //   const res = await axios
    //     .post(`${web}/api/premium/buy`, data, {
    //       headers: { token: token },
    //     })
    //     .catch((err) => {
    //       const message = err.response.data.message;
    //       if (err) {
    //         if (message === "Membresia Vigente") {
    //           localStorage.removeItem("hours");
    //           localStorage.removeItem("update");
    //           localStorage.removeItem("payout");
    //           localStorage.removeItem("metric");
    //           localStorage.removeItem("_id");
    //           window.location.href = "/";
    //         }
    //         if (message === "Esperando confirmacion del pago") {
    //           localStorage.removeItem("hours");
    //           localStorage.removeItem("update");
    //           localStorage.removeItem("payout");
    //           localStorage.removeItem("metric");
    //           localStorage.removeItem("_id");
    //           return (window.location.href = "/");
    //         }
    //       }
    //     });
    //   if (res) {
    //     const message = res.data.message;
    //     this.setState({
    //       id: "",
    //       transaction_id: "",
    //     });
    //     this.onHide(`plan${this.props.plan}Show`, true, message);
    //   } else {
    //   }
    //   this.setState({ message: "Por favor ingresa un ID valido" });
    // }
  };

  const { plan } = props.data;

  return (
    <Modal
      size='lg'
      centered
      show={props.show}
      onHide={() => onHide()}
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
              Luego tienes que escribir tu ID en el formulario de abajo, y el ID
              de transacción de Airtm.
            </mark>
          </strong>
        </p>
        <p>
          <small className='text-muted'>
            Recuerda colocar el ID en la nota de Airtm.
          </small>
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Label>ID</Form.Label>
              <Form.Control name='id' ref={register} required />
            </Col>
            <Col>
              <Form.Label>ID de transacción</Form.Label>
              <Form.Control name='transactionId' ref={register} required />
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
                Si tienes una duda o pregunta acerca de la plataforma, el equipo
                de RemoTable esta activo.
              </strong>
            </mark>
          </small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onHide()}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Buy;
