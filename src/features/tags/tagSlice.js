import { createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
export const tagReducer = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    selectedTag: null,
    createTagImageId: "",
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setCreateTagImageId: (state, action) => {
      state.createTagImageId = action.payload;
    },
    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
    },
  },
});

export const {
  setTags,
  setCreateTagImageId,
  setSelectedTag,
} = tagReducer.actions;

export const retrieveTags = () => async (dispatch) => {
  const response = await apiRequest.get(`/tags`);
  if (response && response.status === 200) {
    const tags = response.data;
    dispatch(setTags(tags));
  } else {
    dispatch(setTags([]));
  }
};

export const uploadTagImage = (data) => async (dispatch) => {
  const response = await apiRequest.post(`/tags/image`, data);
  if (response && response.status === 200) {
    const imageId = response.data;
    dispatch(setCreateTagImageId(imageId));
  } else {
    dispatch(setCreateTagImageId(""));
  }
};

export const createTag = (body) => async (dispatch) => {
  const response = await apiRequest.post(`/tags`, body);
  if (response && response.status === 200) {
    const services = response.data;
    dispatch(setTags(services));
  } else {
    dispatch(setTags([]));
  }
};

export const editTag = (body) => async (dispatch) => {
  const response = await apiRequest.put(`/tags/${body.id}`, body);
  if (response && response.status === 200) {
    const tags = response.data;
    dispatch(setTags(tags));
  } else {
    dispatch(setTags([]));
  }
};

export const deleteTag = (tag) => async (dispatch) => {
  const response = await apiRequest.delete(`/tags/${tag.id}`);
  if (response && response.status === 200) {
    const tags = response.data;
    dispatch(setTags(tags));
  } else {
    dispatch(setTags([]));
  }
};

export const selectTags = (state) => state.tag.tags;
export const selectSelectedTag = (state) => state.tag.selectedTag;
export const selectCreateTagImageId = (state) => state.tag.createTagImageId;

export default tagReducer.reducer;
