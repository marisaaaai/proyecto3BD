import React from "react";
import { connect } from "react-redux";
import * as selectors from "../../../../reducers/index";
import "./styles.css";

const result = ({ graph7 }) => {
  console.log(Object.entries(graph7));
  return (
    <div>
      <div className="stats-container">
        <h1> Reporte </h1>
        <h2 className="sub-title"> Reproducciones por semana </h2>
        {Object.entries(graph7).map(([key, value]) => {
          console.log(value);
          return (
            <div key={key} className="stats_g1">
              <h3 className="album_title"> Semana: </h3>
              <p> {value.weekly}</p>
            </div>
          );
        })}
        {Object.entries(graph7).map(([key, value]) => {
          console.log(value);
          return (
            <div key={key} className="stats_g1">
              <h3 className="album_title"> Reproducciones: </h3>
              <p> {value.reproducciones}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default connect((state) => ({
  graph7: selectors.getGraph7(state),
}))(result);
