import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import * as actions from "../../actions/req";
import { connect } from "react-redux";
import makeRequest from "../../requests/requests";

const ComunNSBHome = ({ onClick }) => {
  return (
    <div className="mods-wrapper">
      <h2>Funcionalidades</h2>
      <Link to="/comunNSB" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Buscar Canciones</h4>
        </div>
      </Link>

      <Link
        to="/comunNSB-home/mod/monitora"
        className="options"
        onClick={onClick}
      >
        <div className="mod-wrapper">
          <h4>Agregar monitor de tipo A</h4>
        </div>
      </Link>
      <Link
        to="/comunNSB-home/mod/monitorb"
        className="options"
        onClick={onClick}
      >
        <div className="mod-wrapper">
          <h4>Agregar monitor de tipo B</h4>
        </div>
      </Link>
      <Link to="/comunNSB-home/stats" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Reportes</h4>
        </div>
      </Link>
      <Link to="/login" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Log Out</h4>
        </div>
      </Link>
    </div>
  );
};

export default connect(undefined, (dispatch) => ({
  onClick() {
    dispatch(actions.remReqInfo());
  },
}))(ComunNSBHome);
