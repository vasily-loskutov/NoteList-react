import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../api/services/auth.service";
import localStorageService from "../api/services/localStorage.service";
import usersService from "../api/services/user.service";
import generateError from "../helper/generateError";
const initialState = localStorageService.getUserId()
  ? {
      entities: [],
      userId: localStorageService.getUserId(),
      isLoading: true,
      error: null,
      isLoggedIn: true,
    }
  : {
      entities: null,
      userId: null,
      error: null,
      isLoading: false,
      isLoggedIn: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userRequestFailed: (state, action) => {
      state.isLoading = false;

      state.error = action.payload;
    },

    userRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state, action) => {
      state.userId = null;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    userRequestSuccess: (state, action) => {
      state.userId = action.payload;
      state.isLoading = true;
      state.isLoggedIn = true;
    },
  },
});
const { actions, reducer: userReducer } = userSlice;
const {
  userRequested,
  userRequestFailed,
  userRecived,
  logOut,
  userRequestSuccess,
} = actions;
export const loadUsers = () => async (dispatch) => {
  try {
    const content = await usersService.get();
    dispatch(userRecived(content));
  } catch (error) {
    dispatch(userRequestFailed(error.message));
  }
};
export const register = (userData, navigate) => async (dispatch, getState) => {
  dispatch(userRequested());
  try {
    const data = await authService.register({
      email: userData.email,
      password: userData.password,
    });
    localStorageService.setTokens(data);
    dispatch(userRequestSuccess(data.userId));
    navigate("/notes");
  } catch (error) {
    const errorMessage = generateError(error.response.data.message);
    dispatch(userRequestFailed(errorMessage));
  }
};
export const logout =
  ({ navigate }) =>
  (dispatch) => {
    localStorageService.removeAuthData();
    navigate("/register");
    dispatch(logOut());
  };
export const logIn = (userData, navigate) => async (dispatch, getState) => {
  dispatch(userRequested());
  try {
    const { data } = await authService.logIn({
      email: userData.email,
      password: userData.password,
    });

    localStorageService.setTokens(data);
    dispatch(userRequestSuccess(data.userId));
    navigate("/notes");
  } catch (error) {
    const errorMessage = generateError(error.response.data.message);
    dispatch(userRequestFailed(errorMessage));
  }
};

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getCurrentUser = () => (state) => {
  return state.user.entities
    ? state.user.entities.find((u) => u._id === state.user.userId)
    : null;
};
export const getAuthError = () => (state) => state.user.error;
export const getUserId = () => (state) => state.user.userId;
export default userReducer;
