import * as userActionTypes from '../../actionTypes/UserActionTypes';
import utils from './utils';

const initialState = {
  isAuthenticated: false,
  wantsToLogin: false,
  userDetails: {
    picture: '', email: '', name: '', _id: '', board: [], id: '',
  },
  token: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOG_ME_IN:
      return utils.logMeIn(state, action);
    case userActionTypes.GET_USER:
    case userActionTypes.LOGIN_SUCCESS:
      return utils.login(state, action);
    case userActionTypes.LOG_OUT:
      return utils.logOut(state);
    default:
      return state;
  }
};

export default UserReducer;
