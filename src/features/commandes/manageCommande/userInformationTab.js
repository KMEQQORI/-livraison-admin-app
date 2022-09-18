import React from "react";
import { colors } from "../../../css/colors";

const styles = {
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
    fontSize: 36,
    textAlign: "center",
    margin: 16,
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
  historiqueButton: {
    backgroundColor: colors.warning,
    color: colors.white,
    width: "50%",
    padding: 8,
    textAlign: "center",
    margin: "16px auto",
    borderRadius: 4,
  },
};

export function UserInformationTab({ commande }) {
  return (
    <div style={styles.card}>
      <span style={styles.cardHeader}>informations utilisateurs:</span>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>numéro :</span>
        <span style={styles.infoValue}>{commande.user?.phoneNumber}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>nom :</span>
        <span style={styles.infoValue}>{commande.user?.name}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>adresse :</span>
        <span style={styles.infoValue}>{commande.user?.address}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>instructions :</span>
        <span style={styles.infoValue}>{commande.user?.instructions}</span>
      </div>
      <div style={styles.historiqueButton}>Voir historique</div>
    </div>
  );
}
