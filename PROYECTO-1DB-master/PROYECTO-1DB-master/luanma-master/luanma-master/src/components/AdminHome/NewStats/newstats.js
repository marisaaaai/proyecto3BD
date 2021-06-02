import React from "react";
import { Link } from "react-router-dom";
import * as actions from "../../../actions/req";
import { connect } from "react-redux";

const newstats = ({ onClick }) => {
  return (
    <div className="mods-wrapper">
      <h2>Nuevos Reportes (proyecto 2) </h2>
      <Link
        to="/admin-home/newstats/esta1"
        className="options"
        onClick={onClick}
      >
        <div className="mod-wrapper">
          <h4>Reproducciones por Semana dadas dos fechas</h4>
        </div>
      </Link>
      <Link
        to="/admin-home/newstats/esta2"
        className="options"
        onClick={onClick}
      >
        <div className="mod-wrapper">
          <h4>Artistas con mas Reproducciones entre dos fechas y limite </h4>
        </div>
      </Link>
      <Link
        to="/admin-home/newstats/esta3"
        className="options"
        onClick={onClick}
      >
        <div className="mod-wrapper">
          <h4>Generos con m[as reproducciones entre fecha1 y fecha2 </h4>
        </div>
      </Link>
      <Link
        to="/admin-home/newstats/esta4"
        className="options"
        onClick={onClick}
      >
        <div className="mod-wrapper">
          <h4>Canciones con Mas Reproducciones dado un artista :)</h4>
        </div>
      </Link>
    </div>
  );
};
export default connect(undefined, (dispatch) => ({
  onClick() {
    dispatch(actions.remReqInfo());
  },
}))(newstats);
