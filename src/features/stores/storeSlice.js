import { createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";

export const storeReducer = createSlice({
  name: "store",
  initialState: {
    stores: [],
    selectedStore: "",
    createStoreImageId: "",
  },
  reducers: {
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setCreateStoreImageId: (state, action) => {
      state.createStoreImageId = action.payload;
    },
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
  },
});

export const {
  setStores,
  setCreateStoreImageId,
  setSelectedStore,
} = storeReducer.actions;

export const retrieveStores = () => async (dispatch) => {
  const response = await apiRequest.get(`/stores`);
  if (response && response.status === 200) {
    const stores = response.data;
    dispatch(setStores(stores));
  } else {
    dispatch(setStores([]));
  }
};

export const uploadStoreImage = (data) => async (dispatch) => {
  const response = await apiRequest.post(`/stores/image`, data);
  if (response && response.status === 200) {
    const imageId = response.data;
    dispatch(setCreateStoreImageId(imageId));
  } else {
    dispatch(setCreateStoreImageId(""));
  }
};

export const createStore = (body) => async (dispatch) => {
  const response = await apiRequest.post(`/stores`, body);
  if (response && response && response.status === 200) {
    const stores = response.data;
    dispatch(setStores(stores));
  } else {
    dispatch(setStores([]));
  }
};

export const editStore = (body) => async (dispatch) => {
  const response = await apiRequest.put(`/stores/${body.id}`, body);
  if (response && response.status === 200) {
    const stores = response.data;
    dispatch(setStores(stores));
  } else {
    dispatch(setStores([]));
  }
};

export const deleteStore = (store) => async (dispatch) => {
  const response = await apiRequest.delete(`/stores/${store.id}`);
  if (response && response.status === 200) {
    const stores = response.data;
    dispatch(setStores(stores));
  } else {
    dispatch(setStores([]));
  }
};

export const selectStores = (state) => state.store.stores;
export const selectSelectedStore = (state) => state.store.selectedStore;
export const selectCreateStoreImageId = (state) =>
  state.store.createStoreImageId;

export default storeReducer.reducer;
