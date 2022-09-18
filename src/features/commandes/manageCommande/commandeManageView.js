import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../css/colors";
import { useParams } from "react-router-dom";
import {
  resetCommande,
  retrieveCommande,
  selectCommande,
} from "../commandesSlice";
import { LivraisonInformationTab } from "./livraisonInformationTab";
import { StoreInformation } from "./storeInformationTab";
import { ProductTab } from "./productsTab";
import { UserInformationTab } from "./userInformationTab";
import { ControlTab } from "./controlTab";
import { StatusTab } from "./statusTab";

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
  card: {
    marginBottom: 32,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    width: "90%",
  },
  cardHeader: {
    color: colors.primary,
    fontSize: 18,
  },
  infoContainer: {
    display: "flex",
    marginTop: 12,
  },
  infoTitle: {
    color: colors.gray,
  },
  infoValue: {
    color: colors.secondary,
  },
};

export function CommandeManageView() {
  const commande = useSelector(selectCommande);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(retrieveCommande(id));
    const interval = setInterval(() => {
      dispatch(retrieveCommande(id));
    }, 5000);
    return function cleanup() {
      clearInterval(interval);
      dispatch(resetCommande());
    };
  }, [dispatch, id]);

  return (
    <>
      {commande?.id ? (
        <div style={styles.mainContainer}>
          <span style={styles.header}>Gérer la commande</span>
          <StatusTab commande={commande} />
          <LivraisonInformationTab commande={commande} />
          <StoreInformation commande={commande} />
          <ProductTab commandeProducts={commande.commandeProducts} />
          <UserInformationTab commande={commande} />
          <ControlTab commande={commande} />
        </div>
      ) : null}
    </>
  );
}
