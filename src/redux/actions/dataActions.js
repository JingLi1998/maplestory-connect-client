import {
  SET_SMEGAS,
  LOADING_DATA,
  FAME_SMEGA,
  DEFAME_SMEGA,
  DELETE_SMEGA,
  SET_ERRORS,
  POST_SMEGA,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SMEGA,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// get all smegas
export const getSmegas = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/smegas')
    .then(res => {
      dispatch({
        type: SET_SMEGAS,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SMEGAS,
        payload: []
      });
    });
};

// get one smega
export const getSmega = smegaId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/smegas/${smegaId}`)
    .then(res => {
      dispatch({
        type: SET_SMEGA,
        payload: res.data
      });
      dispatch({
        type: STOP_LOADING_UI
      });
    })
    .catch(err => console.log(err));
};

// post one smega
export const postSmega = newSmega => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/smegas', newSmega)
    .then(res => {
      dispatch({
        type: POST_SMEGA,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// fame smega
export const fameSmega = smegaId => dispatch => {
  axios
    .get(`/smegas/${smegaId}/fame`)
    .then(res => {
      dispatch({
        type: FAME_SMEGA,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// defame smega
export const defameSmega = smegaId => dispatch => {
  axios
    .get(`/smegas/${smegaId}/defame`)
    .then(res => {
      dispatch({
        type: DEFAME_SMEGA,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// submit a comment
export const submitComment = (smegaId, commentData) => dispatch => {
  axios
    .post(`/smegas/${smegaId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// delete smega
export const deleteSmega = smegaId => dispatch => {
  axios
    .delete(`/smegas/${smegaId}`)
    .then(() => {
      dispatch({ type: DELETE_SMEGA, payload: smegaId });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_SMEGAS,
        payload: res.data.smegas
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SMEGAS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
