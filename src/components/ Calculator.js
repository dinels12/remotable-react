import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default class Calculator extends Component {
  state = {
    hours: 0,
    quality: 5,
    speed: 5,
    bonus: 0,
    points: 0,
    total: 0,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: parseInt(e.target.value) });
  };

  // Funcion para calcular el bono
  bonCalc = (points, quality, speed) => {
    function dot(x) {
      return Number.parseFloat(x).toFixed(2);
    }
    // eslint-disable-next-line no-unused-vars
    let bonus;
    if (points <= 99 || (speed <= 2 && quality <= 5)) {
      return (bonus = 0);
    }
    if (points >= 100 && points <= 499) {
      return (bonus = parseFloat(dot(points / 200)));
    }
    if (points >= 500 && points <= 999) {
      return (bonus = parseFloat(dot(points / 100)));
    }
    if (points >= 1000 && points <= 1999) {
      return (bonus = parseFloat(dot(points / 60)));
    }
    if (points >= 2000) {
      return (bonus = parseFloat(dot(points / 50)));
    }
  };

  dot = (x) => {
    return Number.parseFloat(x).toFixed(2);
  };

  calc = async (h, q, s) => {
    let points = h * q * s;

    let bonus = await this.bonCalc(parseFloat(points), q, s);
    let total = h * 0.5 + bonus;

    this.setState({
      points: points,
      bonus: bonus,
      total: parseFloat(this.dot(total)),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { hours, quality, speed } = this.state;
    this.calc(hours, quality, speed);
    this.calc(hours, quality, speed);
  };

  render() {
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
                    <Form onSubmit={this.onSubmit}>
                      <Row>
                        <Col>
                          <Form.Label>Horas</Form.Label>
                          <Form.Control
                            type='number'
                            onChange={this.onChange}
                            name='hours'
                            value={this.state.hours}
                            required
                          />
                        </Col>
                        <Col>
                          <Form.Label>Calidad</Form.Label>
                          <Form.Control
                            type='number'
                            onChange={this.onChange}
                            name='quality'
                            value={this.state.quality}
                            required
                          />
                        </Col>
                        <Col>
                          <Form.Label>Velocidad</Form.Label>
                          <Form.Control
                            type='number'
                            onChange={this.onChange}
                            name='speed'
                            value={this.state.speed}
                            required
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
                <div style={{ fontSize: "80px" }}>${this.state.total}</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
