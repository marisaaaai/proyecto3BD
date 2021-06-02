import React from "react";
import { connect } from "react-redux";
import * as selectors from "../../../reducers/index";
import "./styles.css";

const result = ({ stats }) => {
  console.log(Object.entries(stats));
  return (
    <div>
      <div className="stats-container">
        <h1> Comision </h1>
        <h2 className="sub-title"> Comision personal </h2>
        {Object.entries(stats).map(([key, value]) => {
          console.log(value);
          return (
            <div key={key} className="stats_g1">
              <h3 className="album_title"> Artista </h3>
              <p> {value.nombre}</p>
            </div>
          );
        })}
        {Object.entries(stats).map(([key, value]) => {
          console.log(value);
          return (
            <div key={key} className="stats_g1">
              <h3 className="album_title"> Comision por reproducciones: </h3>
              <p> {value.comision}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default connect((state) => ({
  stats: selectors.getPC(state),
}))(result);
