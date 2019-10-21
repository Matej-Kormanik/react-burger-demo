import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
      type: actionTypes.AUTH_START
  }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};


export const authFail = (error) => {
 return {
     type: actionTypes.AUTH_FAIL,
     error: error
 }
};


export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOG_OUT
    }
};

// ======   async =====================

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000);
    }
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
      dispatch(authStart());
      const authData = {
          email: email,
          password: password,
          returnSecureToken: true
      };

      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8wzWOap2GwNZqiM3E8cblgab9kJx-8I8';
      if (!isSignUp) {
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8wzWOap2GwNZqiM3E8cblgab9kJx-8I8'
      }

      axios.post(url, authData)
          .then(response => {
              console.log(response.data);
              dispatch(authSuccess(response.data.idToken, response.data.localId));
              dispatch(checkAuthTimeout(response.data.expiresIn));
          })
          .catch(error => {
              console.log(error);
              dispatch(authFail(error));
          })
  }
};
