import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveServices, selectServices } from "./serviceSlice";
import { ServicesList } from "./servicesList";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";

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

export function ServicesView() {
  const services = useSelector(selectServices);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveServices());
  }, [dispatch]);

  return (
    <div style={styles.mainContainer}>
      <Link style={styles.createButton} to="/services/new">
        <span>New Service</span>
      </Link>
      <ServicesList services={services} />
    </div>
  );
}
