import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface State {
  hours: number;
  quality: number;
  speed: number;
  bonus: number;
  points: number;
  total: number;
}

const Calculator = () => {
  const [state, setState] = useState<State>({
    hours: 0,
    quality: 5,
    speed: 5,
    bonus: 0,
    points: 0,
    total: 0,
  });
  const { register, handleSubmit } = useForm();

  // Funcion para calcular el bono
  const bonCalc = (hours: number, quality: number, speed: number): number => {
    let points: number = 0;
    if (hours >= 20 && hours <= 60) points = hours * quality * speed;
    else if (hours <= 20) points = 0;
    else if (hours >= 60) points = 60 * quality * speed;
    if (points <= 99 || (speed <= 2 && quality <= 5)) return 0;
    if (points >= 300 && points <= 499) return points / 200;
    if (points >= 500 && points <= 999) return points / 100;
    if (points >= 1000 && points <= 1999) return points / 70;
    if (points >= 2000) return points / 60;
    return 0;
  };

  const dot = (x: any): string => {
    return Number.parseFloat(x).toFixed(2);
  };

  const calc = async (h: number, q: number, s: number) => {
    let bonus = await bonCalc(h, q, s);
    let total = h * 0.5 + bonus;

    setState({
      ...state,
      bonus: bonus,
      total: parseFloat(dot(total)),
    });
  };

  const onSubmit = (data: any) => {
    const { hours, quality, speed } = data;
    calc(hours, quality, speed);
  };

  return (
    <div className='container'>
      <Row>
        <Col>
          <div
            className='card remoColor text-white'
            style={{
              maxWidth: "500px",
              maxHeight: "250px",
              marginTop: "10px",
            }}
          >
            <div className='card-header'>
              <h1 className='h2'>Calculadora</h1>
            </div>
            <div className='card-body'>
              <Row>
                <Col>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col>
                        <Form.Label>Horas</Form.Label>
                        <Form.Control
                          defaultValue={state.hours}
                          type='number'
                          name='hours'
                          ref={register({ required: true })}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Calidad</Form.Label>
                        <Form.Control
                          defaultValue={state.quality}
                          type='number'
                          ref={register({ required: true })}
                          name='quality'
                        />
                      </Col>
                      <Col>
                        <Form.Label>Velocidad</Form.Label>
                        <Form.Control
                          type='number'
                          name='speed'
                          defaultValue={state.speed}
                          ref={register({ required: true })}
                        />
                      </Col>
                    </Row>
                    <Button type='submit' block className='mt-4'>
                      Calcular
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col>
          <div
            className='card remoColor text-white'
            style={{
              maxWidth: "500px",
              maxHeight: "250px",
              marginTop: "10px",
            }}
          >
            <div className='card-header'>
              <h1 className='h2'>Resultado</h1>
            </div>
            <div className='card-body text-center '>
              <div style={{ fontSize: "80px" }}>${state.total}</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Calculator;
