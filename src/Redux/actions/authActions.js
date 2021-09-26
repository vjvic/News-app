import authApi from "components/apis/authApi";
import { ActionTypes } from "Redux/constants/action-types";
import { setToken, removeToken } from "utils/utils";
import request from "request/request";

//login user
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await authApi.post(request.login, {
      email,
      password,
    });

    setToken(data.idToken);

    dispatch({ type: ActionTypes.GET_TOKEN, payload: data.idToken });
    dispatch({ type: ActionTypes.SET_ERROR, payload: "" });
    dispatch({ type: ActionTypes.CLOSE_LOGIN });
  } catch (error) {
    dispatch({
      type: ActionTypes.SET_ERROR,
      payload: error.response.data.error.message,
    });
  }
};

//signup user
export const signup = (email, password, userName) => (dispatch) => {
  authApi
    .post(request.signup, {
      email,
      password,
      returnSecureToken: true,
    })
    .then((response) => {
      setToken(response.data.idToken);
      dispatch({ type: ActionTypes.GET_TOKEN, payload: response.data.idToken });

      return authApi.post(request.update, {
        idToken: response.data.idToken,
        displayName: userName,
      });
    })
    .then(() => {
      dispatch({ type: ActionTypes.CLOSE_SIGNUP });
      dispatch({ type: ActionTypes.SET_ERROR, payload: "" });
    })
    .catch((error) =>
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
    );
};

//get user data
export const getUserData = (idToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.USER_LOADING });

  const { data } = await authApi.post(request.lookup, { idToken });

  dispatch({ type: ActionTypes.SET_USER, payload: data.users });
};

//logout
export const logout = () => {
  removeToken();
  return { type: ActionTypes.USER_LOGOUT };
};
