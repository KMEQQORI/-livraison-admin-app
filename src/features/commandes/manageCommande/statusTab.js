import React from "react";
import { colors } from "../../../css/colors";
import "./status.css";
import * as moment from "moment";

const styles = {
  card: {
    marginBottom: 32,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    color: colors.primary,
    fontSize: 36,
    textAlign: "center",
    margin: 16,
  },
  sucessStatus: {
    margin: 32,
    fontSize: 32,
    color: colors.success,
  },
  warningStatus: {
    margin: 32,
    fontSize: 32,
    color: colors.warning,
  },
  errorStatus: {
    margin: 32,
    fontSize: 32,
    color: colors.error,
  },
  controlPanel: {
    padding: 16,
    width: "100%",
  },
  errorButton: {
    display: "inline-block",
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.error,
    color: colors.white,
    textAlign: "center",
    width: "40%",
  },
  warningButton: {
    display: "inline-block",
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.warning,
    color: colors.white,
    textAlign: "center",
    width: "40%",
  },
  successButton: {
    display: "inline-block",
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.success,
    color: colors.white,
    textAlign: "center",
    width: "40%",
  },
  update: {
    color: colors.gray,
  },
};

export function StatusTab({ commande }) {
  const getStatusColor = () => {
    switch (commande.status) {
      case "CREATED":
        return "sucessStatus";
      case "CHEKING":
        return "warningStatus";
      case "REFUSED":
        return "errorStatus";
      case "ACCEPTED":
        return "sucessStatus";
      case "COLLECTED":
        return "warningStatus";
      case "DELIVERED":
        return "sucessStatus";
      case "FAILED":
        return "errorStatus";
      case "CANCELED":
        return "errorStatus";
      default:
        return "errorStatus";
    }
  };
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>Status de la commande:</div>
      <div className={getStatusColor()}>{commande.status}</div>
      <div style={styles.update}>
        updated: {moment(commande.updatedAt).fromNow()}
      </div>
      <div style={styles.update}>id: {commande.id}</div>
    </div>
  );
}
