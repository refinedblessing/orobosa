import axios from 'axios';
import credentials from '../credentials.json';
import * as actionTypes from '../actionTypes/UserActionTypes';

export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.LOG_OUT });
  window.location.href = '/logout';
};

export const login = response => dispatch =>
  axios.post(credentials.G_CALLBACK_URL, {
    access_token: response.accessToken, profile: response.profileObj, withCredentials: true, type: 'application/json',
  }).then((res) => {
    const token = res.headers['x-auth-token'];
    const user = res.data;
    if (token) {
      return dispatch({ type: actionTypes.LOGIN_SUCCESS, user, token });
    }
  }).catch(err => dispatch({ type: actionTypes.ERROR, err }));

export const logMeIn = () => ({ type: 'LOG_ME_IN' });

export const getUser = () => dispatch =>
  axios.get('/api/user')
    .then((res) => {
      const token = res.headers['x-auth-token'];
      const user = res.data;
      if (token) {
        return dispatch({ type: actionTypes.GET_USER, user, token });
      }
    }).catch(err => dispatch({ type: actionTypes.ERROR, err }));
