import React from "react";
import { connect } from "react-redux";
import * as selectors from "../../../../reducers/index";
import "./styles.css";

const result = ({ graph8 }) => {
  console.log(Object.entries(graph8));
  return (
    <div>
      <div className="stats-container">
        <h1> Reporte </h1>
        <h2 className="sub-title">
          {" "}
          N Artistas mas reproducidos entre las fechas dadas{" "}
        </h2>
        {Object.entries(graph8).map(([key, value]) => {
          console.log(value);
          return (
            <div key={key} className="stats_g1">
              <h3 className="album_title"> Artista: </h3>
              <p> {value.nombre}</p>
            </div>
          );
        })}
        {Object.entries(graph8).map(([key, value]) => {
          console.log(value);
          return (
            <div key={key} className="stats_g1">
              <h3 className="album_title"> Reproducciones: </h3>
              <p> {value.rep}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default connect((state) => ({
  graph8: selectors.getGraph8(state),
}))(result);
