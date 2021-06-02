import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import * as actions from "../../actions/req";
import { connect } from "react-redux";

const ComunNSHome = ({ onClick }) => {
  return (
    <div className="mods-wrapper">
      <h2>Funcionalidades</h2>
      <Link to="/comunNS" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Buscar Canciones</h4>
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
}))(ComunNSHome);
