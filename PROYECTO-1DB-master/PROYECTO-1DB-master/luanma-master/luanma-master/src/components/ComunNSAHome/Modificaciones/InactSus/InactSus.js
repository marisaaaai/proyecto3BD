import React from "react";

import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Alert } from "reactstrap";
import { Redirect } from "react-router-dom";

import * as actions from "../../../../actions/req";
import * as selectors from "../../../../reducers/index";
import makeRequest from "../../../../requests/requests";

const InactSus = ({
  handleSubmit,
  submitting,
  reqSuccess,
  reqMsg,
  modSuccess,
}) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>
          Selecciona un usuario a quien quiera desactivarle la suscripcion
        </h1>
        <form onSubmit={handleSubmit}>
          <Field
            name="user_name"
            className="firstname"
            label="Correo a desactivar: "
            component={renderInput}
          ></Field>
          {reqSuccess ? (
            <div className="alert">
              <Alert color="danger">Ups! {reqMsg.msg}</Alert>
            </div>
          ) : null}
          <div className="createAccount">
            <button type="submit" disabled={submitting}>
              Agregar
            </button>
          </div>
        </form>
        {modSuccess ? <Redirect to="/comunNSA-home" /> : null}
      </div>
    </div>
  );
};

const validate = (values) => {
  //Validacion del Register Form

  const error = {};

  if (!values.user_name) {
    error.user_name = "Campo requerido";
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
  form: "inactSusForm",
  destroyOnUnmount: false,
  onSubmit(values, dispatch) {
    console.log(values);
    const requestInfo = {
      uri: `http://localhost:8000/track/inacSus`,
      type: "PUT",
    };
    makeRequest(values, requestInfo, (res) => {
      dispatch(actions.doRequest(res.action));
    });
  },
  validate,
})(
  connect((state) => ({
    reqSuccess: selectors.getReqSuccess(state),
    reqMsg: selectors.getReqMsg(state),
    modSuccess: selectors.getModSuccess(state),
    user_name: selectors.getUserName(state),
  }))(InactSus)
);
