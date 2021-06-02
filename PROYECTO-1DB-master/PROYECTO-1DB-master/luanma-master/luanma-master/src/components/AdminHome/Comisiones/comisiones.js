import React from "react";

import ComisionsRow from "./Columnas/columnas";
import * as selectors from "../../../reducers";

import "./styles.css";
import { connect } from "react-redux";

const Comisiones = ({ comisions }) => {
  console.log(comisions);
  return (
    <div className="binnacle-main-container">
      <div className="binnacle-container">
        <h2> Comisiones :)</h2>
        <div className="binnacle-titles">
          <div className="binnacle-title"> Artista</div>
          <div className="binnacle-title"> Artista Id </div>
          <div className="binnacle-title"> Comision </div>
        </div>
        <div className="binnacle-rows">
          {comisions ? (
            Object.values(comisions.payload.comisions).map((comisionsRow) => (
              <ComisionsRow rowInfo={comisionsRow} />
            ))
          ) : (
            <div> Vacio </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  comisions: selectors.getBinnacle(state)
    ? selectors.getBinnacle(state)
    : undefined,
}))(Comisiones);
