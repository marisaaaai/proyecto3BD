import React from "react";
import { connect } from "react-redux";
import * as selectors from "../../../../reducers/index";
import "./styles.css";

const result = ({ graph9 }) => {
  console.log(Object.entries(graph9));
  return (
    <div>
      <div className="stats-container">
        <h1> Reporte </h1>
        <h2 className="sub-title"> Reproducciones por genero </h2>
        {Object.entries(graph9).map(([key, value]) => {
          console.log(value);
          return (
            <div key={key} className="stats_g1">
              <h3 className="album_title"> Genero: </h3>
              <p> {value.genero}</p>
            </div>
          );
        })}
        {Object.entries(graph9).map(([key, value]) => {
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
  graph9: selectors.getGraph9(state),
}))(result);
