import { createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";

export const adReducer = createSlice({
  name: "ad",
  initialState: {
    ads: [],
    selectedAd: "",
    createAdImageId: "",
  },
  reducers: {
    setAds: (state, action) => {
      state.ads = action.payload;
    },
    setCreateAdImageId: (state, action) => {
      state.createAdImageId = action.payload;
    },
    setSelectedAd: (state, action) => {
      state.selectedAd = action.payload;
    },
  },
});

export const { setAds, setCreateAdImageId, setSelectedAd } = adReducer.actions;

export const retrieveAds = () => async (dispatch) => {
  const response = await apiRequest.get(`/ads`);
  if (response && response.status === 200) {
    const ads = response.data;
    dispatch(setAds(ads));
  } else {
    dispatch(setAds([]));
  }
};

export const uploadAdImage = (data) => async (dispatch) => {
  const response = await apiRequest.post(`/ads/image`, data);
  if (response && response.status === 200) {
    const imageId = response.data;
    dispatch(setCreateAdImageId(imageId));
  } else {
    dispatch(setCreateAdImageId(""));
  }
};

export const createAd = (body) => async (dispatch) => {
  const response = await apiRequest.post(`/ads`, body);
  if (response && response && response.status === 200) {
    const ads = response.data;
    dispatch(setAds(ads));
  } else {
    dispatch(setAds([]));
  }
};

export const editAd = (body) => async (dispatch) => {
  const response = await apiRequest.put(`/ads/${body.id}`, body);
  if (response && response.status === 200) {
    const ads = response.data;
    dispatch(setAds(ads));
  } else {
    dispatch(setAds([]));
  }
};

export const deleteAd = (ad) => async (dispatch) => {
  const response = await apiRequest.delete(`/ads/${ad.id}`);
  if (response && response.status === 200) {
    const ads = response.data;
    dispatch(setAds(ads));
  } else {
    dispatch(setAds([]));
  }
};

export const selectAds = (state) => state.ad.ads;
export const selectSelectedAd = (state) => state.ad.selectedAd;
export const selectCreateAdImageId = (state) => state.ad.createAdImageId;

export default adReducer.reducer;
