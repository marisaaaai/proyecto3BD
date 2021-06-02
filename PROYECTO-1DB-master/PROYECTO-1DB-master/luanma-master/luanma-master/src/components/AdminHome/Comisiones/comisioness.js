import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import * as actions from "../../../actions/bitacora";
import { connect } from "react-redux";
import makeRequest from "../../../requests/requests";

const comisionesHome = ({ onClick }) => {
  return (
    <div className="mods-wrapper">
      <h2>Click Para ver las comisiones :)</h2>

      <Link to="/admin-home/comisioness" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Comisiones</h4>
        </div>
      </Link>
    </div>
  );
};
export default connect(undefined, (dispatch) => ({
  onClick() {
    const requestInfo = {
      uri: `http://localhost:8000/comisions`,
      type: "GET",
    };
    makeRequest(null, requestInfo, (res) => {
      console.log(res);
      dispatch(actions.getBinnacle(res.action));
    });
  },
}))(comisionesHome);
