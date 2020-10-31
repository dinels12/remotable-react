import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PayoutInterface } from "../interface";

const UserHistory = () => {
  const history: PayoutInterface = JSON.parse(
    localStorage.getItem("history") || "[]"
  );

  return (
    <div className='container'>
      <div className='row'>
        <div id='hoursTable' className='col m-auto'>
          <div className='card remoColor'>
            <div className='card-header d-flex justify-content-between align-content-center'>
              <Link to='/' className='btn btn-secondary'>
                Volver
              </Link>
              <Link
                to={{ pathname: "/stats", state: { history } }}
                className='btn btn-secondary'
              >
                Estadisticas
              </Link>
              <button className='btn btn-info'>
                Semanas: {history.length}
              </button>
            </div>
            <div id='preShow' className='card-body'>
              <div id='SHOW' className='card remoColor'>
                <div className='container'>
                  <div className='row'>
                    {history.map((data: PayoutInterface) => (
                      <div key={data.date} className='col-md-4 mt-2 mb-2'>
                        <Card className='remoColor2'>
                          <Card.Header className='text-'>
                            <h1 className='h4'>{data.payout}</h1>
                          </Card.Header>
                          <Card.Body>
                            <div
                              className='d-flex justify-content-between align-items-center'
                              style={{ fontSize: "1.2em" }}
                            >
                              <div>Horas</div>
                              <div>
                                <i className='far fa-clock'></i> {data.hours}
                              </div>
                            </div>
                            <hr />
                            <div
                              className='d-flex justify-content-between align-items-center'
                              style={{ fontSize: "1.2em" }}
                            >
                              {data.quality >= 5 ? (
                                <div>
                                  C{" "}
                                  <i className='fas fa-thumbs-up text-success'></i>{" "}
                                  {data.quality}
                                </div>
                              ) : (
                                <div>
                                  C{" "}
                                  <i className='fas fa-thumbs-down text-danger'></i>{" "}
                                  {data.quality}
                                </div>
                              )}
                              {data.speed >= 5 ? (
                                <div>
                                  V{" "}
                                  <i className='fas fa-thumbs-up text-success'></i>{" "}
                                  {data.speed}
                                </div>
                              ) : (
                                <div>
                                  V{" "}
                                  <i className='fas fa-thumbs-down text-danger'></i>{" "}
                                  {data.speed}
                                </div>
                              )}
                            </div>
                            <hr />
                            <div
                              className='d-flex justify-content-between align-items-center'
                              style={{ fontSize: "1.05em" }}
                            >
                              {data.extra > 0 ? (
                                <div>
                                  Extra <i className='fas fa-dollar-sign'></i>
                                  {data.extra}
                                </div>
                              ) : null}

                              {data.bonus > 0 ? (
                                <div>
                                  Bono <i className='fas fa-dollar-sign'></i>
                                  {data.bonus}
                                </div>
                              ) : null}
                            </div>
                            {data.bonus || data.extra > 0 ? <hr /> : null}
                            <div
                              className='text-center mt-2'
                              style={{ fontSize: "1.5em" }}
                            >
                              Total <i className='fas fa-dollar-sign'></i>
                              {data.total}
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
