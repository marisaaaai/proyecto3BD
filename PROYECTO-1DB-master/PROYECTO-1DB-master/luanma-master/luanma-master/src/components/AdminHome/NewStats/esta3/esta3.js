import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

import "./styles.css";
import makeRequest from "../../../../requests/requests";
import * as selectors from "../../../../reducers/index";
import * as actions from "../../.././../actions/stats";

const esta3 = ({
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
        <h1>Generos mas escuchados entre dos fechas :) </h1>
        <h4>Ingresa fechas a consultar (yyyy-mm-dd)</h4>
        <form
          onSubmit={handleSubmit((values) => {
            onSubmit(values, dispatch);
          })}
        >
          <Field
            name="fecha1"
            className="firstName"
            label="Fecha mas pequena"
            component={renderInput}
          />
          <Field
            name="fecha2"
            className="firstName"
            label="Fecha menos pequena"
            component={renderInput}
          />
          {reqSuccess ? (
            <div className="alert">
              <Alert color="danger">Ups! {reqMsg.msg}</Alert>
            </div>
          ) : null}
          <div className="createAccount">
            <button type="submit" disabled={submitting}>
              Ingresar fechas
            </button>
          </div>
          <Link
            to="/admin-home/newstats/esta9/result"
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

  if (!values.fecha1) {
    error.day1 = "Campo requerido";
  }

  if (!values.fecha2) {
    error.day2 = "Campo requerido";
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
  form: "esta9",
  destroyOnUnmount: false,
  onSubmit(values, dispatch) {
    const { fecha1, fecha2 } = values;
    console.log(values);
    const requestInfo5 = {
      uri: `http://localhost:8000/esta3/${fecha1}/${fecha2}`,
      type: "GET",
    };
    makeRequest(null, requestInfo5, (res) => {
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
    stats: selectors.getGraph9(state),
  }))(esta3)
);
