import * as userActionTypes from '../../actionTypes/UserActionTypes';
import utils from './utils';

const initialState = {
  isAuthenticated: false,
  wantsToLogin: false,
  userDetails: {
    picture: '', email: '', name: '', id: '',
  },
  token: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOG_ME_IN:
      return utils.logMeIn(state, action);
    case userActionTypes.LOGIN_SUCCESS:
      return utils.login(state, action);
    default:
      return state;
  }
};

export default UserReducer;
