import { createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
export const userReducer = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUser: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUsers, setSelectedUser } = userReducer.actions;

export const retrieveUsers = () => async (dispatch) => {
  const response = await apiRequest.get(`/users`);
  if (response && response.status === 200) {
    const users = response.data;
    dispatch(setUsers(users));
  } else {
    dispatch(setUsers([]));
  }
};

export const updateUserStatus = (user, status) => async (dispatch) => {
  const response = await apiRequest.post(
    `/users/${user.id}/updateStatus`,
    status
  );
  if (response && response.status === 200) {
    const users = response.data;
    dispatch(setUsers(users));
  } else {
    dispatch(setUsers([]));
  }
};

export const selectTags = (state) => state.user.tags;
export const selectSelectedTag = (state) => state.user.selectedTag;

export default userReducer.reducer;
