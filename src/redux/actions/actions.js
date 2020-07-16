import API from '../../apis/API';

export const AUTH_USER = 'AUTH_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

export const authUser = (userData) => {
  API.setAuthToken(userData.token);
  return {
    type: AUTH_USER,
    payload: userData,
  };
};

export const signOutUser = (userData) => {
  API.clearAuthToken();
  return {
    type: SIGN_OUT_USER,
  };
};
