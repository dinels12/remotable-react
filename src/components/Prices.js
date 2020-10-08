import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Buy from "./Buy";
import BuySuccesful from "./BuySuccesful";
import { register } from "../environment";

export default class Prices extends Component {
  state = {
    plan1Show: false,
    plan2Show: false,
    plan3Show: false,
    buyState: "",
    buyMessage: "",
  };

  onClick = (plan) => {
    this.setState({ [plan]: true });
  };

  onHide = (plan, buy, message) => {
    if (plan && buy && message) {
      this.setState({ [plan]: false, buyState: buy, buyMessage: message });
    } else if (plan) {
      this.setState({ [plan]: false });
    }
  };

  render() {
    const {
      plan1Show,
      plan2Show,
      plan3Show,
      buyState,
      buyMessage,
    } = this.state;
    return (
      <div className='container'>
        {plan1Show ? (
          <Buy show={plan1Show} data={{ plan: 1 }} onHide={this.onHide} />
        ) : null}{" "}
        {plan2Show ? (
          <Buy show={plan2Show} data={{ plan: 2 }} onHide={this.onHide} />
        ) : null}{" "}
        {plan3Show ? (
          <Buy show={plan3Show} data={{ plan: 3 }} onHide={this.onHide} />
        ) : null}
        {buyState ? (
          <BuySuccesful
            show={buyState}
            message={buyMessage}
            onHide={this.onHide}
          />
        ) : null}
        <Row>
          <Col>
            <div
              className='card remoColor text-white mt-5 change'
              style={{ maxHeight: "350px" }}
            >
              <div className='card-header'>
                <h1 className='h3'>Plan 1</h1>
              </div>
              <div className='card-body'>
                <h2 className='h4'>Subscripcion Mensual</h2>
                <hr />
                <div>RemoTable Premium</div>
                <div className='text-muted h6'>
                  Incluye acceso a todas a las caracteristicas actuales de la
                  aplicacion, y futuras actualizaciones.
                </div>
                <div className='h5'>
                  Precio: <strong>$1 mensual</strong>
                </div>

                <hr />
                {register === "open" ? (
                  <Button block onClick={() => this.onClick("plan1Show")}>
                    Comprar
                  </Button>
                ) : (
                  <Button>Registros Cerrados</Button>
                )}
              </div>
            </div>
          </Col>
          <Col>
            <div
              className='card remoColor text-white mt-5 change'
              style={{ maxHeight: "350px" }}
            >
              <div className='card-header'>
                <h1 className='h3'>Plan 2</h1>
              </div>
              <div className='card-body'>
                <h2 className='h4'>Subscripcion de 6 meses</h2>
                <hr />
                <div>RemoTable Premium</div>
                <div className='text-muted h6'>
                  Incluye acceso a todas a las caracteristicas actuales de la
                  aplicacion, y futuras actualizaciones.
                </div>
                <div className='h5'>
                  Precio: <strong>$5 cada 6 meses</strong>
                </div>

                <hr />
                {register === "open" ? (
                  <Button block onClick={() => this.onClick("plan2Show")}>
                    Comprar
                  </Button>
                ) : (
                  <Button>Registros Cerrados</Button>
                )}
              </div>
            </div>
          </Col>
          <Col>
            <div
              className='card remoColor text-white mt-5 change'
              style={{ maxHeight: "350px" }}
            >
              <div className='card-header'>
                <h1 className='h3'>Plan 3</h1>
              </div>
              <div className='card-body'>
                <h2 className='h4'>Subscripcion Anual</h2>
                <hr />
                <div>RemoTable Premium</div>
                <div className='text-muted h6'>
                  Incluye acceso a todas a las caracteristicas actuales de la
                  aplicacion, y futuras actualizaciones.
                </div>
                <div className='h5'>
                  Precio: <strong>$9 anual</strong>
                </div>

                <hr />
                {register === "open" ? (
                  <Button block onClick={() => this.onClick("plan3Show")}>
                    Comprar
                  </Button>
                ) : (
                  <Button>Registros Cerrados</Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
