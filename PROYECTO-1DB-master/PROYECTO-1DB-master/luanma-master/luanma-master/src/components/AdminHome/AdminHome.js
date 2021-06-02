import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import * as actions from "../../actions/stats";
import { connect } from "react-redux";
import makeRequest from "../../requests/requests";

const AdminHome = ({ onClick }) => {
  return (
    <div className="mods-wrapper">
      <h2>Funcionalidades</h2>
      <Link to="/admin-home/mod" className="options">
        <div className="mod-wrapper">
          <h4>Modificaciones</h4>
        </div>
      </Link>
      <Link to="/admin-home/bitacora" className="options">
        <div className="mod-wrapper">
          <h4>Bitacora</h4>
        </div>
      </Link>
      <Link to="/admin-home/comisiones" className="options">
        <div className="mod-wrapper">
          <h4>Comisiones</h4>
        </div>
      </Link>
      <Link to="/admin-home/stats" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Reportes</h4>
        </div>
      </Link>
      <Link to="/admin-home/newstats" className="options">
        <div className="mod-wrapper">
          <h4>Reportes pt2</h4>
        </div>
      </Link>
      <Link to="/admin-home/sim" className="options">
        <div className="mod-wrapper">
          <h4>Simular reproducciones</h4>
        </div>
      </Link>
      <Link to="/admin-home/mongo" className="options">
        <div className="mod-wrapper">
          <h4>BD no Relacional Mongo</h4>
        </div>
      </Link>
    </div>
  );
};

export default connect(undefined, (dispatch) => ({
  onClick() {
    const requestInfo = {
      uri: `http://localhost:8000/stats`,
      type: "GET",
    };
    makeRequest(null, requestInfo, (res) => {
      console.log(res);
      dispatch(actions.loadedStats(res.action));
    });
  },
}))(AdminHome);
