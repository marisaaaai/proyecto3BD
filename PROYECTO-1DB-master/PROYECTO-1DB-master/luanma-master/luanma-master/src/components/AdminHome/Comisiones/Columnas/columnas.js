import React from "react";

import "./styles.css";

const ComisionsRow = ({ rowInfo }) => {
  return (
    <div className="binnacle-row">
      <div className="binnacle-cell">{rowInfo.nombre}</div>
      <div className="binnacle-cell">{rowInfo.artista_id}</div>
      <div className="binnacle-cell">{rowInfo.comision}</div>
    </div>
  );
};
export default ComisionsRow;
