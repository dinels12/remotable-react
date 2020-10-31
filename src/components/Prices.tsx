import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Buy from "./Buy";
import BuySuccesful from "./BuySuccesful";
import { REGISTER } from "../environment";

interface State {
  plan1Show: boolean;
  plan2Show: boolean;
  plan3Show: boolean;
  buyState: boolean;
  buyMessage: string;
}

const Prices = () => {
  const [state, setState] = useState<State>({
    plan1Show: false,
    plan2Show: false,
    plan3Show: false,
    buyState: false,
    buyMessage: "",
  });

  const onClick = (plan: string) => {
    setState({ ...state, [plan]: true });
  };

  const onHide = (plan: string, buy: boolean, message: string) => {
    if (plan && buy && message) {
      setState({ ...state, [plan]: false, buyState: buy, buyMessage: message });
    } else if (plan) {
      setState({ ...state, [plan]: false });
    }
  };
  const { plan1Show, plan2Show, plan3Show, buyState, buyMessage } = state;
  return (
    <div className='container'>
      {plan1Show ? (
        <Buy show={plan1Show} data={{ plan: 1 }} onHide={onHide} />
      ) : null}{" "}
      {plan2Show ? (
        <Buy show={plan2Show} data={{ plan: 2 }} onHide={onHide} />
      ) : null}{" "}
      {plan3Show ? (
        <Buy show={plan3Show} data={{ plan: 3 }} onHide={onHide} />
      ) : null}
      {buyState ? (
        <BuySuccesful show={buyState} message={buyMessage} onHide={onHide} />
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
              {REGISTER === "open" ? (
                <Button block onClick={() => onClick("plan1Show")}>
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
              {REGISTER === "open" ? (
                <Button block onClick={() => onClick("plan2Show")}>
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
              {REGISTER === "open" ? (
                <Button block onClick={() => onClick("plan3Show")}>
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
};
export default Prices;
