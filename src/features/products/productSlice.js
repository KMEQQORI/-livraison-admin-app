import { createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
import { selectSelectedStore } from "../stores/storeSlice";

export const productReducer = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: null,
    createProductImageId: "",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCreateProductImageId: (state, action) => {
      state.createProductImageId = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setCreateProductImageId, setSelectedProduct } =
  productReducer.actions;

export const retrieveProducts = () => async (dispatch, getState) => {
  const selectStore = selectSelectedStore(getState());
  const response = await apiRequest.get(`/stores/${selectStore.id}/products`);
  if (response && response.status === 200) {
    const products = response.data;
    dispatch(setProducts(products));
  } else {
    dispatch(setProducts([]));
  }
};

export const uploadProductImage = (data) => async (dispatch) => {
  const response = await apiRequest.post(`/products/image`, data);
  if (response && response.status === 200) {
    const imageId = response.data;
    dispatch(setCreateProductImageId(imageId));
  } else {
    dispatch(setCreateProductImageId(""));
  }
};

export const createProduct = (body) => async (dispatch) => {
  const response = await apiRequest.post(`/products`, body);
  if (response && response.status === 200) {
    const products = response.data;
    dispatch(setProducts(products));
  } else {
    dispatch(setProducts([]));
  }
};

export const deleteProduct = (product) => async (dispatch) => {
  const response = await apiRequest.delete(`/products/${product.id}`);
  if (response && response.status === 200) {
    const products = response.data;
    dispatch(setProducts(products));
  } else {
    dispatch(setProducts([]));
  }
};

export const duplicateProduct = (product) => async (dispatch) => {
  const response = await apiRequest.post(`/products/${product.id}/duplicate`);
  if (response && response.status === 200) {
    const products = response.data;
    dispatch(setProducts(products));
  } else {
    dispatch(setProducts([]));
  }
};

export const editProduct = (product) => async (dispatch) => {
  const response = await apiRequest.put(`/products/${product.id}`, product);
  if (response && response.status === 200) {
    const products = response.data;
    dispatch(setProducts(products));
  } else {
    dispatch(setProducts([]));
  }
};

export const selectProducts = (state) => state.product.products;
export const selectCreateProductImageId = (state) =>
  state.product.createProductImageId;
export const selectSelectedProduct = (state) => state.product.selectedProduct;

export default productReducer.reducer;
