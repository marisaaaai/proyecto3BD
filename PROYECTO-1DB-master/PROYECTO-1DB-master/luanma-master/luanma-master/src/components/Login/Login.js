import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Alert } from "reactstrap";
import isValidEmail from "sane-email-validation";
import * as actions from "../../actions/auth.js";
import { Link, Redirect } from "react-router-dom";

import "./styles.css";
import makeRequest from "../../requests/requests";

import * as selectors from "../../reducers/index";

const Login = ({
  handleSubmit,
  submitting,
  error,
  onClick,
  isAuthenticated,
  userType,
}) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Ingresa a tu cuenta</h1>
        <form onSubmit={handleSubmit}>
          <Field
            name="emailAddress"
            type="email"
            label="Correo Electronico"
            component={renderInput}
          />
          <div className="field">
            <label>Contraseña</label>
            <Field
              name="password"
              type="password"
              label="Contraseña"
              component="input"
              placeholder="Contraseña"
            />
          </div>
          {error ? (
            <div className="alert">
              <Alert color="danger">
                Los valores ingresados son incorrectos {error}
              </Alert>
            </div>
          ) : null}
          <div className="createAccount">
            <button type="submit" disabled={submitting}>
              Login
            </button>
            <Link to="/register" onClick={onClick}>
              <small>Sign up :) </small>
            </Link>
          </div>
        </form>
        {isAuthenticated && userType === "comunS" ? (
          <Redirect to="/comunS-home" />
        ) : isAuthenticated && userType === "admin" ? (
          <Redirect to="/admin-home" />
        ) : isAuthenticated && userType === "artista" ? (
          <Redirect to="/artista-home" />
        ) : isAuthenticated && userType === "comunNSA" ? (
          <Redirect to="/comunNSA-home" />
        ) : isAuthenticated && userType === "comunNSB" ? (
          <Redirect to="/comunNSB-home" />
        ) : isAuthenticated && userType === "comunSA" ? (
          <Redirect to="/comunSA-home" />
        ) : isAuthenticated && userType === "comunSB" ? (
          <Redirect to="/comunSB-home" />
        ) : isAuthenticated ? (
          <Redirect to="/comunNS-home" />
        ) : null}
      </div>
    </div>
  );
};

const validate = (values) => {
  //Validacion del Register Form

  const error = {};

  if (!values.emailAddress) {
    error.emailAddress = "Campo requerido";
  } else if (!isValidEmail(values.emailAddress)) {
    error.emailAddress = "Correo electronico invalido";
  }
  if (!values.password) {
    error.password = "Campo requerido";
  }

  return error;
};

const renderInput = ({ input, meta, label }) => (
  <div className="field">
    <label>{label}</label>
    <input
      {...input}
      className={[
        meta.active ? "active" : "",
        meta.error && meta.touched ? "error" : "",
        meta.active && meta.error ? "active" : "",
      ].join("")}
      placeholder={label}
    />
    {meta.error && meta.touched && (
      <span className="errorMessage">{meta.error}</span>
    )}
  </div>
);

export default reduxForm({
  form: "loginForm",
  destroyOnUnmount: false,
  onSubmit(values, dispatch) {
    //Logea al usuario y verifica si es ADMIN
    console.log(values);
    dispatch(actions.loadUser());

    const requestInfo = {
      uri: `http://localhost:8000/user/${values.emailAddress}/${values.password}`,
      type: "GET",
    };

    makeRequest(values, requestInfo, (res) => {
      console.log(res);
      dispatch(actions.loginUser(res.action));
    });
  },
  validate,
})(
  connect(
    (state) => ({
      isAuthenticated: selectors.getIsAuth(state),
      userType: selectors.getUserType(state),
    }),
    (dispatch) => ({})
  )(Login)
);
