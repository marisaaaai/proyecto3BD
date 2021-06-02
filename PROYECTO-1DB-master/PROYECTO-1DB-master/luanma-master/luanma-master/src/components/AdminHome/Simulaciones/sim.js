import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

import "./styles.css";
import makeRequest from "../../../requests/requests";
import * as selectors from "../../../reducers/index";
import * as actions from "../../.././actions/stats";

const sim = ({
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
        <h1>Simular reproducciones</h1>
        <h4>Ingresa datos</h4>
        <form onSubmit={handleSubmit}>
          <Field
            name="fecha"
            className="firstName"
            label="Fecha de reproduccion (yyyy-mm-dd)"
            component={renderInput}
          />
          <Field
            name="num_tracks"
            className="firstName"
            label="No. de tracks a reproducir"
            component={renderInput}
          />
          <Field
            name="num_rep"
            className="firstName"
            label="No. de reproducciones"
            component={renderInput}
          />
          {reqSuccess ? (
            <div className="alert">
              <Alert color="danger">Ups! {reqMsg.msg}</Alert>
            </div>
          ) : null}
          <div className="createAccount">
            <button type="submit" disabled={submitting}>
              Crear reproducciones
            </button>
          </div>
          <Link to="/admin-home" className="createAccount" onClick={onClick}>
            <div className="mod-wrapper">
              <h4>Regresar</h4>
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

  if (!values.fecha) {
    error.nombre = "Campo requerido";
  }
  if (!values.num_track) {
    error.nombre = "Campo requerido";
  }
  if (!values.num_rep) {
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
      uri: `http://localhost:8000/sim`,
      type: "POST",
    };
    makeRequest(values, requestInfo5, (res) => {
      console.log(res);
      console.log(values);
      dispatch(actions.loadedStats(res.action));
    });
  },
  validate,
})(
  connect((state) => ({
    reqSuccess: selectors.getReqSuccess(state),
    reqMsg: selectors.getReqMsg(state),
    modSuccess: selectors.getModSuccess(state),
  }))(sim)
);
