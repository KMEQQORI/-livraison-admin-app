import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import {
  resetCommandes,
  retrieveCommandes,
  selectCommandes,
} from "./commandesSlice";
import { CommandesList } from "./commandeList";
import { useParams } from "react-router-dom";

const styles = {
  mainContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  header: {
    color: colors.primary,
    fontSize: "18px",
    padding: 16,
  },
};

export function CommandesView() {
  const commandes = useSelector(selectCommandes);
  const dispatch = useDispatch();
  let { status } = useParams();

  useEffect(() => {
    dispatch(retrieveCommandes(status));
    const interval = setInterval(() => {
      dispatch(retrieveCommandes(status));
    }, 5000);
    return function cleanup() {
      clearInterval(interval);
      dispatch(resetCommandes());
    };
  }, [dispatch, status]);

  return (
    <div style={styles.mainContainer}>
      <span style={styles.header}>
        les commandes de status :{status ? status : "all"}
      </span>
      <CommandesList commandes={commandes} />
    </div>
  );
}
