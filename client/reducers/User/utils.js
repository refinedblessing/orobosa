const utils = {
  login: (state, action) => {
    const { user, token } = action;
    return {
      ...state, user, token, wantsToLogin: false,
    };
  },
  logMeIn: state => ({ ...state, wantsToLogin: true }),
  logOut: state =>
    ({
      ...state, wantsToLogin: false, user: null, isAuthenticated: false,
    }),
};

export default utils;
