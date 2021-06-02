import React from "react";

import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Alert } from "reactstrap";
import { Redirect } from "react-router-dom";

import * as actions from "../../../../../actions/req";
import * as selectors from "../../../../../reducers/index";
import makeRequest from "../../../../../requests/requests";

const modificarArtistas = ({
  handleSubmit,
  submitting,
  reqSuccess,
  reqMsg,
  modSuccess,
  loggedUser,
  onSubmit,
  dispatch,
}) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Modifica un Artista</h1>
        <form
          onSubmit={handleSubmit((values) => {
            values.modifiedBy = loggedUser;
            onSubmit(values, dispatch);
          })}
        >
          <Field
            name="artista_id"
            className="firsname"
            label="Artista"
            component={renderInput}
          ></Field>
          <Field
            name="newartistname"
            className="firstName"
            label="Nombre de Artista"
            component={renderInput}
          />
          {reqSuccess ? (
            <div className="alert">
              <Alert color="danger">Ups! {reqMsg.msg}</Alert>
            </div>
          ) : null}
          <div className="createAccount">
            <button type="submit" disabled={submitting}>
              Modificar Artista
            </button>
          </div>
        </form>
        {modSuccess ? <Redirect to="/admin-home" /> : null}
      </div>
    </div>
  );
};

const validate = (values) => {
  //Validacion del Register Form

  const error = {};

  if (!values.newartistname) {
    error.newartistname = "Campo requerido";
  }

  return error;
};

const renderSelect = ({ input, label, children }) => (
  <div className="field">
    <label>{label}</label>
    <select {...input}>{children}</select>
  </div>
);

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
  form: "modArtistForm",
  destroyOnUnmount: false,
  onSubmit(values, dispatch) {
    const requestInfo = {
      uri: `http://localhost:8000/artist/update`,
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
    artists: selectors.getArtists(state),
    loggedUser: selectors.getUserName(state),
  }))(modificarArtistas)
);
