import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    token: "",
    selectedTabName: "Home",
    showNavBar: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    selectTabName: (state, action) => {
      state.selectedTabName = action.payload;
    },
    setShowNavBar: (state, action) => {
      state.showNavBar = action.payload;
    },
  },
});

export const { selectTabName, setToken, setShowNavBar } = commonSlice.actions;

export const setJWTToken = (token) => async (dispatch) => {
  await localStorage.setItem("JWTToken", token);
  dispatch(setToken(token));
};

export const retreiveToken = () => async (dispatch) => {
  const token = await localStorage.getItem("JWTToken");
  if (token) {
    dispatch(setToken(token));
  }
};

export const deleteToken = () => async (dispatch) => {
  await localStorage.removeItem("JWTToken");
  dispatch(setToken(""));
};

export const selectMenu = (element) => async (dispatch) => {
  dispatch(selectTabName(element));
  dispatch(setShowNavBar(false));
};
export const selectSelectedTab = (state) => state.common.selectedTabName;
export const selectToken = (state) => state.common.token;
export const selectShowNavBar = (state) => state.common.showNavBar;

export default commonSlice.reducer;
