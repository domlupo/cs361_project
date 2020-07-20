import { AUTH_USER, SIGN_OUT_USER } from '../actions/actions';

const initialState = {
  authenticated: false,
  user: {},
  token: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        ...action.payload,
        authenticated: true,
      };
    case SIGN_OUT_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
