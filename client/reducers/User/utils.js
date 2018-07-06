const utils = {
  login: (state, action) => {
    const { user, token } = action;
    return {
      ...state, userDetails: user, token, wantsToLogin: false, isAuthenticated: true,
    };
  },
  logMeIn: state => ({ ...state, wantsToLogin: true }),
  logOut: state => ({
    ...state, userDetails: {}, token: '', wantsToLogin: false, isAuthenticated: false,
  }),
};

export default utils;
