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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOG_OUT
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
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
              const expritationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
              localStorage.setItem('token', response.data.idToken);
              localStorage.setItem('userId', response.data.localId);
              localStorage.setItem('expirationDate', expritationDate);
              dispatch(authSuccess(response.data.idToken, response.data.localId));
              dispatch(checkAuthTimeout(response.data.expiresIn));
          })
          .catch(error => {
              console.log(error);
              dispatch(authFail(error));
          })
  }
};

export const authCheckState = () => {
  return (dispatch) => {
      const token = localStorage.getItem('token');
      if (!token) {
          dispatch(logOut());
      } else {
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if (expirationDate <= new Date()) {
              dispatch(logOut());
          }
          else {
              dispatch(authSuccess(token, localStorage.getItem('userId')));
              dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
          }
      }
  }
};