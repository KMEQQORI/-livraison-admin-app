import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { retrieveAds, selectAds } from "./adSlice";
import { AdsList } from "./adsList";

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

export function AdsView() {
  const ads = useSelector(selectAds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveAds());
  }, [dispatch]);

  return (
    <div style={styles.mainContainer}>
      <Link style={styles.createButton} to="/ads/new">
        <span>New Ad</span>
      </Link>
      <AdsList ads={ads} />
    </div>
  );
}
