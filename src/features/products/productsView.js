import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { appConfig } from "../../config";
import { selectSelectedStore } from "../stores/storeSlice";
import { ProductList } from "./ProductList";
import { retrieveProducts, selectProducts } from "./productSlice";

const styles = {
  mainContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  createButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: 16,
    margin: 20,
    borderRadius: 4,
    textDecoration: "none",
  },
  storeHeader: {
    width: "100%",
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray}`,
  },
  image: {
    marginBottom: 16,
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
  },
  storeName: {
    padding: 8,
  },
};

export function ProductsView() {
  const selectedStore = useSelector(selectSelectedStore);
  const storeProducts = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveProducts());
  }, [dispatch]);

  return (
    <div style={styles.mainContainer}>
      <div style={styles.storeHeader}>
        <img
          alt=""
          style={styles.image}
          src={`${appConfig.apiUrl}/api/static/stores/${selectedStore.image}`}
        />
        <div style={styles.storeName}>{selectedStore.name}</div>
        <div style={styles.storeName}>{selectedStore.nameAr}</div>
      </div>
      <Link style={styles.createButton} to="/stores/products/new">
        <span>New Product</span>
      </Link>
      <ProductList products={storeProducts} />
    </div>
  );
}
