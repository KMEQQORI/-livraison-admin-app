import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { retrieveStores, selectStores } from "./storeSlice";
import { StoresList } from "./storesList";

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
};

export function StoresView() {
  const stores = useSelector(selectStores);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveStores());
  }, [dispatch]);

  return (
    <div style={styles.mainContainer}>
      <Link style={styles.createButton} to="/stores/new">
        <span>New Store</span>
      </Link>
      <StoresList stores={stores} />
    </div>
  );
}
