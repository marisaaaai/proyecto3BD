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
        to="/admin-home/mod/inact-song"
        className="options"
        onClick={onClick}
      >
        <div className="mod-wrapper">
          <h4>Inactivación de una canción del cátalogo</h4>
        </div>
      </Link>
      <Link to="/admin-home/mod/modss" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>
            Modificación de la información de una canción, album y artista de la
            base de datos
          </h4>
        </div>
      </Link>
      <Link to="/admin-home/mod/delete" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>
            Eliminación de una canción, album y artista de la base de datos
          </h4>
        </div>
      </Link>
      <Link to="/admin-home/mod/monitora" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Agregar monitorA</h4>
        </div>
      </Link>
      <Link to="/admin-home/mod/monitorb" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Agregar monitorB</h4>
        </div>
      </Link>
      <Link to="/admin-home" className="options" onClick={onClick}>
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
