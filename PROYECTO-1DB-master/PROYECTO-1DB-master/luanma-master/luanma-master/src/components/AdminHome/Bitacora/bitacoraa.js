import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import * as actions from "../../../actions/bitacora";
import { connect } from "react-redux";
import makeRequest from "../../../requests/requests";

const bitacoraHome = ({ onClick }) => {
  return (
    <div className="mods-wrapper">
      <h2>Click Para ver Bitacora :)</h2>

      <Link to="/admin-home/bitacoraa" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>bitacora</h4>
        </div>
      </Link>
    </div>
  );
};
export default connect(undefined, (dispatch) => ({
  onClick() {
    const requestInfo = {
      uri: `http://localhost:8000/binnacle`,
      type: "GET",
    };
    makeRequest(null, requestInfo, (res) => {
      console.log(res);
      dispatch(actions.getBinnacle(res.action));
    });
  },
}))(bitacoraHome);
