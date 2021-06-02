import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import * as actions from "../../actions/stats";
import { connect } from "react-redux";
import makeRequest from "../../requests/requests";

const ComunSHome = ({ onClick }) => {
  return (
    <div className="mods-wrapper">
      <h2>Funcionalidades</h2>
      <Link to="/comunS" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Buscar Canciones</h4>
        </div>
      </Link>
      <Link to="/comunS-home/playlist" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Playlist</h4>
        </div>
      </Link>

      <Link to="/login" className="options" onClick={onClick}>
        <div className="mod-wrapper">
          <h4>Log Out</h4>
        </div>
      </Link>
    </div>
  );
};

export default connect(undefined, (dispatch) => ({
  onClick() {
    const requestInfo = {
      uri: `http://localhost:8000/stats`,
      type: "GET",
    };
    makeRequest(null, requestInfo, (res) => {
      console.log(res);
      dispatch(actions.loadedStats(res.action));
    });
  },
}))(ComunSHome);
