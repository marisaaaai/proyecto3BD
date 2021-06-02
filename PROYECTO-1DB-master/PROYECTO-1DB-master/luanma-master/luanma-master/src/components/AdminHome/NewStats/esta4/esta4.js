import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

import "./styles.css";
import makeRequest from "../../../../requests/requests";
import * as selectors from "../../../../reducers/index";
import * as actions from "../../.././../actions/stats";

const esta4 = ({
  handleSubmit,
  submitting,
  reqSuccess,
  reqMsg,
  onClick,
  onSubmit,
  dispatch,
}) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Canciones mas escuchadas de X artista</h1>
        <h4>Ingresa nombre de un artista</h4>
        <form onSubmit={handleSubmit}>
          <Field
            name="nombre"
            className="firstName"
            label="Nombre de artista"
            component={renderInput}
          />
          {reqSuccess ? (
            <div className="alert">
              <Alert color="danger">Ups! {reqMsg.msg}</Alert>
            </div>
          ) : null}
          <div className="createAccount">
            <button type="submit" disabled={submitting}>
              Ingresar nombre
            </button>
          </div>
          <Link
            to="/admin-home/newstats/esta10/result"
            className="createAccount"
            onClick={onClick}
          >
            <div className="mod-wrapper">
              <h4>Ver resultados</h4>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

const validate = (values) => {
  //Validacion del Register Form

  const error = {};

  if (!values.nombre) {
    error.nombre = "Campo requerido";
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
  form: "esta10",
  destroyOnUnmount: false,
  onSubmit(values, dispatch) {
    console.log(values);
    console.log("aqui");
    const requestInfo5 = {
      uri: `http://localhost:8000/esta4`,
      type: "POST",
    };
    makeRequest(values, requestInfo5, (res) => {
      console.log(res);
      dispatch(actions.loadedStats(res.action));
    });
  },
  validate,
})(
  connect((state) => ({
    reqSuccess: selectors.getReqSuccess(state),
    reqMsg: selectors.getReqMsg(state),
    modSuccess: selectors.getModSuccess(state),
    stats: selectors.getGraph10(state),
  }))(esta4)
);
