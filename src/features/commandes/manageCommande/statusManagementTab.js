import React from "react";
import { colors } from "../../../css/colors";
import { appConfig } from "../../../config";

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
  storeImage: {
    marginBottom: 16,
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
  },
};

export function StatusManagementTab({ commande }) {
  return (
    <div style={styles.card}>
      <span style={styles.cardHeader}>statut:</span>
      <img
        alt=""
        style={styles.storeImage}
        src={`${appConfig.apiUrl}/api/static/stores/${commande.store?.image}`}
      />
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>nom :</span>
        <span style={styles.infoValue}>{commande.store?.name}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>nom arabe :</span>
        <span style={styles.infoValue}>{commande.store?.nameAr}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>description :</span>
        <span style={styles.infoValue}>{commande.store?.description}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>description arabe :</span>
        <span style={styles.infoValue}>{commande.store?.descriptionAr}</span>
      </div>
    </div>
  );
}
