import React from "react";

import "./styles.css";

const BinnacleRow = ({ rowInfo }) => {
  return (
    <div className="binnacle-row">
      <div className="binnacle-cell">{rowInfo.fecharegistro}</div>
      <div className="binnacle-cell">{rowInfo.correo}</div>
      <div className="binnacle-cell">{rowInfo.accion}</div>
      <div className="binnacle-cell">{rowInfo.tabla}</div>
    </div>
  );
};
export default BinnacleRow;
