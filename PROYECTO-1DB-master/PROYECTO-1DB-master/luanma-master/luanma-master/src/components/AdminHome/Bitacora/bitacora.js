import React from "react";

import BinnacleRow from "./Columnas/columnas";
import * as selectors from "../../../reducers";

import "./styles.css";
import { connect } from "react-redux";

const Bitacora = ({ binnacle }) => {
  console.log(binnacle);
  return (
    <div className="binnacle-main-container">
      <div className="binnacle-container">
        <h2> Bitacora :)</h2>
        <div className="binnacle-titles">
          <div className="binnacle-title"> fechaRegistro</div>
          <div className="binnacle-title"> Usuario Correo </div>
          <div className="binnacle-title"> Accion </div>
          <div className="binnacle-title"> Tabla</div>
        </div>
        <div className="binnacle-rows">
          {binnacle ? (
            Object.values(binnacle.payload.binnacle).map((binnacleRow) => (
              <BinnacleRow rowInfo={binnacleRow} />
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
  binnacle: selectors.getBinnacle(state)
    ? selectors.getBinnacle(state)
    : undefined,
}))(Bitacora);
