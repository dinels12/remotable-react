import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Anuncio from "./Anuncio";
import NavbarBottom from "./NavbarBottom";
import NavBarTop from "./NavBarTop";
import BtnMod from "./BtnMod";
import { VictoryPie, VictoryLabel } from "victory";
import Expired from "./Expired";
import { NotFoundClose, NotFoundOpen } from "./NotFound";
import { PayoutInterface, UserInterface } from "../interface";
import { REGISTER } from "../environment";
import { Spinner } from "react-bootstrap";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(_id: $id) {
      user {
        _id
        Hours
        invalid
        skip
        sqb
        update_at
        anuncios
        annoucements {
          author
          title
          body
          date
          urgent
          number
        }
      }
      history {
        date
        payout
        hours
        quality
        speed
        bonus
        extra
        total
      }
      message
      error
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $input: UserInput) {
    updateUser(_id: $id, input: $input) {
      error
      message
    }
  }
`;

interface State {
  notFound: boolean;
  expired: boolean;
  message: string;
}
interface Response {
  getUser: {
    user: UserInterface;
    history: PayoutInterface;
    message: string;
    error: number;
  };
}

const User = () => {
  const { loading, error: errors, data } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem("_id") },
    pollInterval: 500,
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [state, setState] = useState<State>({
    notFound: false,
    expired: false,
    message: "",
  });

  const dot = (x: string) => {
    return Number.parseFloat(x).toFixed(2);
  };

  const por = (x: number) => {
    return (x / 40) * 100;
  };

  const onHide = async () => {
    const id = localStorage.getItem("_id");
    await updateUser({
      variables: {
        id: id,
        input: {
          anuncios: false,
        },
      },
    });
  };

  const logout = () => {
    const conf = window.confirm("Cerrar sesion?");
    if (conf) {
      localStorage.removeItem("_id");
      localStorage.removeItem("hours");
      localStorage.removeItem("payout");
      localStorage.removeItem("loading");
      localStorage.removeItem("update");
      localStorage.removeItem("metric");
      localStorage.removeItem("cache");
      window.location.href = "/";
    }
  };

  const notFoundHide = () => {
    setState({ ...state, notFound: false });
    localStorage.removeItem("_id");
    window.location.href = "/plans";
  };

  const expiredHide = () => {
    setState({ ...state, expired: false });
    localStorage.removeItem("_id");
    window.location.href = "/plans";
  };

  if (loading) {
    document.body.classList.add("bg-success");
    return (
      <div id='hello' className='hello'>
        <div className='row'>
          <div className='col'>
            <h1
              className='text-white text-center'
              style={{ fontSize: "100px" }}
            >
              Hello:)
              <br />
            </h1>
            <div className='text-center text-white'>
              <Spinner animation='border' role='status' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (errors) {
    console.log(errors);
  }

  const {
    getUser: { user, history, error, message },
  }: Response = data;
  const { expired, notFound } = state;
  const status = localStorage.getItem("status");
  localStorage.setItem("history", JSON.stringify(history));
  if (error) {
    if (message === "Membresia Expirada") {
      localStorage.removeItem("hours");
      localStorage.removeItem("update");
      localStorage.removeItem("payout");
      localStorage.removeItem("metric");
      localStorage.removeItem("_id");
      setState({ ...state, message: message, expired: true });
    } else if (message === "Usuario no encontrado.") {
      localStorage.removeItem("hours");
      localStorage.removeItem("update");
      localStorage.removeItem("payout");
      localStorage.removeItem("metric");
      localStorage.removeItem("_id");
      setState({ ...state, message: message, notFound: true });
    }
  }

  document.body.classList.remove("bg-success");
  document.body.classList.add("bgColor");
  return (
    <div className='mst'>
      {user.anuncios ? (
        <Anuncio
          show={user.anuncios}
          list={user.annoucements[0]}
          onHide={() => onHide()}
        />
      ) : null}
      {expired ? <Expired show={expired} onHide={() => expiredHide()} /> : null}
      {notFound ? (
        REGISTER === "open" ? (
          <NotFoundOpen show={notFound} onHide={() => notFoundHide()} />
        ) : (
          <NotFoundClose show={notFound} onHide={() => notFoundHide()} />
        )
      ) : null}

      <NavBarTop
        logout={() => logout()}
        history={history}
        status={status || "Offline"}
      />

      <div className='card newCard'>
        <div id='preShow' className='card-body'>
          <div id='SHOW' className='card remoColor'>
            <div className='card-header'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='m-auto'>
                  <div className='container'>
                    <div id='actualPayout' className='text-center fontS'>
                      ${dot((user.Hours * 0.5).toString())}
                    </div>
                    <div className='text-center fontP'>PAGO</div>
                  </div>
                </div>
                <div className='m-auto respM380'>
                  <div className='container'>
                    <div className='fontS'>
                      <svg width={200} height={200}>
                        <VictoryPie
                          standalone={false}
                          animate={{ duration: 1000 }}
                          width={200}
                          height={200}
                          data={[
                            { key: "", y: por(user.Hours) },
                            { key: "", y: 100 - por(user.Hours) },
                          ]}
                          innerRadius={70}
                          labels={() => null}
                          colorScale={["#19B3A6", "#EEEEEE"]}
                        />
                        <VictoryLabel
                          textAnchor='middle'
                          verticalAnchor='middle'
                          x={100}
                          y={100}
                          text={user.Hours}
                          style={{ fontSize: 35 }}
                        />
                      </svg>
                    </div>
                    <div className='text-center'>
                      <BtnMod
                        invalid={user.invalid}
                        skip={user.skip}
                        sqb={user.sqb}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <div className='col-md-12'>
                {status === "Online" && history[0].total > 0 ? (
                  <Card className='remoColor2'>
                    <Card.Header className='d-flex justify-content-between align-items-center'>
                      <div className='h4'>{history[0].payout}</div>
                    </Card.Header>
                    <Card.Body>
                      <div
                        style={{ fontSize: "1.2em" }}
                        className='d-flex justify-content-between align-items-center'
                      >
                        <div>
                          Horas <i className='far fa-clock'></i>{" "}
                          {history[0].hours}
                        </div>
                        {history[0].quality >= 5 ? (
                          <div>
                            Calidad{" "}
                            <i className='fas fa-thumbs-up text-success'></i>{" "}
                            {history[0].quality}
                          </div>
                        ) : (
                          <div>
                            Calidad{" "}
                            <i className='fas fa-thumbs-down text-danger'></i>{" "}
                            {history[0].quality}
                          </div>
                        )}
                        {history[0].speed >= 5 ? (
                          <div>
                            Velocidad{" "}
                            <i className='fas fa-thumbs-up text-success'></i>{" "}
                            {history[0].speed}
                          </div>
                        ) : (
                          <div>
                            Velocidad{" "}
                            <i className='fas fa-thumbs-down text-danger'></i>{" "}
                            {history[0].speed}
                          </div>
                        )}
                      </div>
                      <hr />
                      <div
                        className='d-flex justify-content-between align-items-center'
                        style={{ fontSize: "1.2em" }}
                      >
                        {history[0].extra > 0 ? (
                          <div>
                            Extra <i className='fas fa-dollar-sign'></i>
                            {history[0].extra}
                          </div>
                        ) : null}

                        {history[0].bonus > 0 ? (
                          <div>
                            Bono <i className='fas fa-dollar-sign'></i>
                            {history[0].bonus}
                          </div>
                        ) : null}
                        <div>
                          Total <i className='fas fa-dollar-sign'></i>
                          {history[0].total}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarBottom update={user.update_at} />
    </div>
  );
};

export default User;
