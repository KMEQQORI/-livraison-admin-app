import { createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";

export const commandeReducer = createSlice({
  name: "commande",
  initialState: {
    commandes: [],
    commande: null,
  },
  reducers: {
    setCommandes: (state, action) => {
      state.commandes = action.payload;
    },
    setCommande: (state, action) => {
      state.commande = action.payload;
    },
  },
});

export const { setCommandes, setCommande } = commandeReducer.actions;

export const retrieveCommandes = (status) => async (dispatch) => {
  let response = null;
  if (status) {
    response = await apiRequest.get(`/commandes/status/${status}`);
  } else {
    response = await apiRequest.get(`/commandes/all`);
  }
  if (response?.status === 200) {
    const commandes = response.data;
    dispatch(setCommandes(commandes));
  } else {
    dispatch(setCommandes([]));
  }
};

export const retrieveCommande = (idCommande) => async (dispatch) => {
  const response = await apiRequest.get(`/commandes/${idCommande}`);
  if (response?.status === 200) {
    const commande = response.data;
    dispatch(setCommande(commande));
  } else {
    dispatch(setCommande([]));
  }
};

export const controlCommande = (idCommande, status) => async (dispatch) => {
  const response = await apiRequest.put(`/commandes/${idCommande}/${status}`);
  if (response?.status === 200) {
    const commande = response.data;
    dispatch(setCommande(commande));
  } else {
    dispatch(setCommande([]));
  }
};

export const resetCommande = () => async (dispatch) => {
  dispatch(setCommande(null));
};

export const resetCommandes = () => async (dispatch) => {
  dispatch(setCommandes([]));
};

export const selectCommandes = (state) => state.commande.commandes;
export const selectCommande = (state) => state.commande.commande;

export default commandeReducer.reducer;
