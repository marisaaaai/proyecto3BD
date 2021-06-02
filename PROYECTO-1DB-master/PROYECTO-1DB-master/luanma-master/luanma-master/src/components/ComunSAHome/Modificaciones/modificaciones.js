import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import * as actions from "../../../actions/req";
import { connect } from "react-redux";

const Mods = ({ onClick }) => {
  return (
    <div className="mods-wrapper">
      <h2>Modificaciones</h2>
      <Link
        to="/comunSA-home/mod/inact-song"
        className="options"
        onClick={onClick}
      >
        <div className="mod-wrapper">
          <h4>Inactivación de una canción del cátalogo</h4>
        </div>
      </Link>
      <Link to="/comunSA-home/mod/modss" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>
            Modificación de la información de una canción y album de la base de
            datos
          </h4>
        </div>
      </Link>
      <Link to="/comunSA-home/mod/delete" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Eliminación de suscripcion de un usuario</h4>
        </div>
      </Link>
      <Link to="/comunSA-home" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Regresar</h4>
        </div>
      </Link>
    </div>
  );
};

export default connect(undefined, (dispatch) => ({
  onClick() {
    dispatch(actions.remReqInfo());
  },
}))(Mods);
