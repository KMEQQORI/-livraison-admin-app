import React from "react";
import { colors } from "../../css/colors";
import { useHistory } from "react-router-dom";
import "./commandeList.css";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 100,
  },
  commandeItem: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  image: {
    margin: 16,
    width: 150,
    height: 150,
    objectFit: "cover",
  },
  tagContainer: {
    display: "flex",
    padding: "4px 16px",
    borderRadius: 16,
    margin: 4,
    backgroundColor: colors.darkGray,
    color: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  showButton: {
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
    margin: 16,
  },
  info: {
    width: "80%",
    padding: 12,
  },
  infoTitle: {
    color: colors.darkGray,
    marginRight: 8,
  },
};

export function CommandesList({ commandes }) {
  const history = useHistory();

  const getStatusColor = (commande) => {
    switch (commande.status) {
      case "CREATED":
        return "sucessStatusCard";
      case "CHEKING":
        return "warningStatusCard";
      case "REFUSED":
        return "errorStatusCard";
      case "ACCEPTED":
        return "sucessStatusCard";
      case "COLLECTED":
        return "warningStatusCard";
      case "DELIVERED":
        return "sucessStatusCard";
      case "FAILED":
        return "errorStatusCard";
      case "CANCELED":
        return "errorStatusCard";
      default:
        return "errorStatusCard";
    }
  };

  const handleShowCommande = (commande) => {
    history.push(`/commandes/manage/${commande.id}`);
  };

  return (
    <div style={styles.mainContainer}>
      {commandes?.map((commande) => {
        return (
          <div
            style={styles.commandeItem}
            key={commande.id}
            className={getStatusColor(commande)}
          >
            <div style={styles.info}>
              <span style={styles.infoTitle}>id :</span> {commande.id}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>status :</span>
              {commande.status}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>user :</span>
              {commande?.user?.phoneNumber} : {commande?.user?.name}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>store :</span>
              {commande.store?.name} {commande.store?.address}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>adresse :</span>
              {commande.address}
            </div>
            <div
              style={styles.showButton}
              onClick={() => handleShowCommande(commande)}
            >
              <span>Afficher</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
