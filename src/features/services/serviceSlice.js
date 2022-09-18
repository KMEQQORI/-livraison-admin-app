import { createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
export const serviceReducer = createSlice({
  name: "service",
  initialState: {
    services: [],
    selectedService: null,
    createServiceImageId: "",
  },
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    setCreateServiceImageId: (state, action) => {
      state.createServiceImageId = action.payload;
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
});

export const {
  setServices,
  setCreateServiceImageId,
  setSelectedService,
} = serviceReducer.actions;

export const retrieveServices = () => async (dispatch) => {
  const response = await apiRequest.get(`/services`);
  if (response && response.status === 200) {
    const services = response.data;
    dispatch(setServices(services));
  } else {
    dispatch(setServices([]));
  }
};

export const uploadServiceImage = (data) => async (dispatch) => {
  const response = await apiRequest.post(`/services/image`, data);
  if (response && response.status === 200) {
    const imageId = response.data;
    dispatch(setCreateServiceImageId(imageId));
  } else {
    dispatch(setCreateServiceImageId(""));
  }
};

export const createService = (body) => async (dispatch) => {
  const response = await apiRequest.post(`/services`, body);
  if (response && response.status === 200) {
    const services = response.data;
    dispatch(setServices(services));
  } else {
    dispatch(setServices([]));
  }
};

export const editService = (body) => async (dispatch) => {
  const response = await apiRequest.put(`/services/${body.id}`, body);
  if (response && response.status === 200) {
    const services = response.data;
    dispatch(setServices(services));
  } else {
    dispatch(setServices([]));
  }
};

export const deleteService = (service) => async (dispatch) => {
  const response = await apiRequest.delete(`/services/${service.id}`);
  if (response && response.status === 200) {
    const services = response.data;
    dispatch(setServices(services));
  } else {
    dispatch(setServices([]));
  }
};

export const selectServices = (state) => state.service.services;
export const selectSelectedService = (state) => state.service.selectedService;
export const selectCreateServiceImageId = (state) =>
  state.service.createServiceImageId;

export default serviceReducer.reducer;
