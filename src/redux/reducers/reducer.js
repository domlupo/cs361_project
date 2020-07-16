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
      };
    case SIGN_OUT_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
