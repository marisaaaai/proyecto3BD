import React from "react";
import { connect } from "react-redux";
import * as selectors from "../../../../reducers/index";
import "./styles.css";

const result = ({ graph10 }) => {
  console.log(Object.entries(graph10));
  return (
    <div>
      <div className="stats-container">
        <h1> Reporte </h1>
        <h2 className="sub-title"> Canciones mas escuchadas </h2>
        {Object.entries(graph10).map(([key, value]) => {
          console.log(value);
          return (
            <div key={key} className="stats_g1">
              <h3 className="album_title"> Cancion: </h3>
              <p> {value.nombre}</p>
            </div>
          );
        })}
        {Object.entries(graph10).map(([key, value]) => {
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
  graph10: selectors.getGraph10(state),
}))(result);
