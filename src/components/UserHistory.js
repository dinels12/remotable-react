import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const { development, production, token } = require("../environment");
let web = development;
if (process.env.NODE_ENV === "production") {
  web = production;
}
// 5e737df650fb650032e31bae

export default class UserHistory extends Component {
  state = {
    history: [],
  };

  async componentDidMount() {
    const id = localStorage.getItem("_id");
    const res = await axios
      .get(`${web}/api/user/payouts/${id}`, {
        headers: { token: token },
      })
      .catch((err) => {
        if (err) return console.log("Error");
      });
    if (res) {
      this.setState({ history: res.data });
    }
  }

  render() {
    return (
      <div id={this.state._id} className='container'>
        <div className='row'>
          <div id='hoursTable' className='col m-auto'>
            <div className='card remoColor'>
              <div className='card-header d-flex justify-content-between align-content-center'>
                <Link to='/' className='btn btn-secondary'>
                  Volver
                </Link>
                <Link to='/stats' className='btn btn-secondary'>
                  Estadisticas
                </Link>
                <button className='btn btn-info'>
                  Semanas: {this.state.history.length}
                </button>
              </div>
              <div id='preShow' className='card-body'>
                <div id='SHOW' className='card remoColor'>
                  <Table
                    responsive='sm'
                    striped
                    bordered
                    hover
                    variant='dark'
                    size='sm'
                  >
                    <thead>
                      <tr>
                        <th className='text-center'>Semana</th>
                        <th className='text-center'>Horas</th>
                        <th className='text-center'>Calidad</th>
                        <th className='text-center'>Speed</th>
                        <th className='text-center'>Bonus</th>
                        <th className='text-center'>Extra</th>
                        <th className='text-center'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.history.map((payout) => (
                        <tr key={payout._id}>
                          <td className='text-center'>
                            {payout.payout.replace(/Horas/g, "")}
                          </td>
                          <td className='text-center'>{payout.hours}</td>
                          <td className='text-center'>{payout.quality}</td>
                          <td className='text-center'>{payout.speed}</td>
                          <td className='text-center'>${payout.bonus}</td>
                          <td className='text-center'>${payout.extra}</td>
                          <td className='text-center'>${payout.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
