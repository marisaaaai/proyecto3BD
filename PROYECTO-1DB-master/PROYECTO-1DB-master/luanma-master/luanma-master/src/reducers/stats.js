import * as types from "../types/stats";
import { combineReducers } from "redux";

const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.STATS_LOADING:
      return true;
    case types.STATS_LOADED:
      return false;
    case types.STATS_ERROR:
      return false;
    case types.LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
};
const statsInfo = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph1 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph1,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph2 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph2,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph3 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph3,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph4 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph4,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph5 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph5,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph6 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph6,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

const graph7 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph7,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph8 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph8,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph9 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph9,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const graph10 = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.graph10,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
const PComisions = (state = {}, action) => {
  switch (action.type) {
    case types.STATS_LOADED:
      return {
        ...action.payload.comisions,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

const stats = combineReducers({
  isLoading,
  statsInfo,
  graph1,
  graph2,
  graph3,
  graph4,
  graph5,
  graph6,
  graph7,
  graph8,
  graph9,
  graph10,
  PComisions,
});

export default stats;

export const getIsLoading = (state) => state.isLoading;

export const getStats = (state, graphNum) => state.statsInfo[graphNum];

export const getGraph1 = (state) => state.graph1;

export const getGraph2 = (state) => state.graph2;

export const getGraph3 = (state) => state.graph3;

export const getGraph4 = (state) => state.graph4;

export const getGraph5 = (state) => state.graph5;

export const getGraph6 = (state) => state.graph6;

export const getGraph7 = (state) => state.graph7;

export const getGraph8 = (state) => state.graph8;

export const getGraph9 = (state) => state.graph9;

export const getGraph10 = (state) => state.graph10;

export const getPC = (state) => state.PComisions;
