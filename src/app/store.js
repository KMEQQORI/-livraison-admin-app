import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import commonReducer from "../features/common/commonSlice";
import serviceReducer from "../features/services/serviceSlice";
import tagReducer from "../features/tags/tagSlice";
import storeReducer from "../features/stores/storeSlice";
import productReducer from "../features/products/productSlice";
import commandeReducer from "../features/commandes/commandesSlice";
import adReducer from "../features/ads/adSlice";
import { userReducer } from "../features/users/userSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    common: commonReducer,
    service: serviceReducer,
    store: storeReducer,
    tag: tagReducer,
    user: userReducer,
    product: productReducer,
    commande: commandeReducer,
    ad: adReducer,
  },
});
