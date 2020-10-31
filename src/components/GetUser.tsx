import React, { useState, useRef } from "react";
import Expired from "./Expired";
import { NotFoundClose, NotFoundOpen } from "./NotFound";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { REGISTER } from "../environment";

// 5e737df650fb650032e31bae

const USER_LOGIN = gql`
  mutation userLogin($id: ID!) {
    userLogin(_id: $id) {
      error
      message
    }
  }
`;

interface State {
  id?: string;
  message: string;
  redirect: boolean;
  expired: boolean;
  notFound: boolean;
}

interface Response {
  userLogin: {
    error: number;
    message: string;
  };
}
const GetUser = () => {
  const [state, setState] = useState<State>({
    message: "Consultar",
    redirect: false,
    expired: false,
    notFound: false,
  });
  const { register, handleSubmit } = useForm();
  const [userLogin] = useMutation(USER_LOGIN);
  const message = useRef<HTMLButtonElement>(null);

  const messageError = () => {
    message.current?.classList.remove("btn-primary");
    message.current?.classList.add("btn-danger");
  };

  const messageLoading = () => {
    message.current?.classList.remove("btn-danger");
    message.current?.classList.remove("btn-primary");
    message.current?.classList.add("btn-info");
  };

  const messageSuccess = () => {
    message.current?.classList.remove("btn-danger");
    message.current?.classList.remove("btn-primary");
    message.current?.classList.remove("btn-info");
    message.current?.classList.add("btn-success");
  };

  const onSubmit = async ({ id = "false" }: State) => {
    if (id.length === 24) {
      setState({ ...state, message: "Cargando" });
      messageLoading();
      const { data } = await userLogin({ variables: { id: id } });
      const {
        userLogin: { error, message },
      }: Response = data;

      console.log(error, message);
      if (!error) {
        setState({ ...state, message: message });
        messageSuccess();
        localStorage.setItem("_id", id);
        window.location.reload();
      } else if (error) {
        if (message === "Membresia Expirada") {
          localStorage.removeItem("_id");
          setState({ ...state, expired: true, message: message });
          return messageError();
        }
        if (message === "Usuario no encontrado.") {
          localStorage.removeItem("_id");
          setState({ ...state, notFound: true, message: message });
          return messageError();
        } else {
          localStorage.removeItem("_id");
          setState({ ...state, message: message });
          return messageError();
        }
      }
    } else {
      setState({ ...state, message: "Por favor ingresa un ID valido" });
      return messageError();
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

  const { expired, notFound } = state;

  return (
    <div>
      <div id='formConsult' className='col-6 m-auto'>
        {expired ? (
          <Expired
            show={expired}
            onHide={() => {
              expiredHide();
            }}
          />
        ) : null}
        {notFound ? (
          REGISTER === "open" ? (
            <NotFoundOpen show={notFound} onHide={() => notFoundHide()} />
          ) : (
            <NotFoundClose show={notFound} onHide={() => notFoundHide()} />
          )
        ) : null}
        <div className='card remoColor'>
          <div className='card-header'>
            <h1>Consultar la tabla</h1>
          </div>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-group'>
                <label htmlFor='usrId'></label>
                Introduzca su ID
                <input
                  id='usrId'
                  name='id'
                  type='text'
                  ref={register}
                  className='form-control'
                  placeholder='Introduce tu ID'
                  autoFocus
                />
              </div>
              <button
                ref={message}
                className='btn btn-primary btn-block'
                type='submit'
              >
                {state.message}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetUser;
