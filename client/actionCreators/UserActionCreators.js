import axios from 'axios';
import credentials from '../credentials.json';
import * as actionTypes from '../actionTypes/UserActionTypes';

export const logOut = () => dispatch =>
  axios.get('/api/logout');

export const login = response => (dispatch) => {
  return axios.post(credentials.G_CALLBACK_URL, { access_token: response.accessToken, withCredentials: true, type: 'application/json' })
    .then((res) => {
      const token = res.headers['x-auth-token'];
      const user = res.data;
      if (token && user) {
        return dispatch({ type: actionTypes.LOGIN_SUCCESS, user, token });
      }
    }).catch(err => dispatch({ type: actionTypes.ERROR, err }));
};

export const logMeIn = () => ({ type: 'LOG_ME_IN' });
