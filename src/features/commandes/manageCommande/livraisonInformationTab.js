import React from "react";
import { colors } from "../../../css/colors";
import { MapViewer } from "../../common/MapViewer";
import { useDispatch } from "react-redux";
import { updateUserStatus } from "../../users/userSlice";

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
  successButton: {
    padding: "16px 32px",
    margin: 16,
    borderRadius: 6,
    backgroundColor: colors.success,
    color: colors.white,
  },
  errorButton: {
    padding: "16px 32px",
    margin: 16,
    borderRadius: 6,
    backgroundColor: colors.error,
    color: colors.white,
  },
  warningButton: {
    padding: "16px 32px",
    margin: 16,
    borderRadius: 6,
    backgroundColor: colors.warning,
    color: colors.white,
  },
  map: {
    width: "100%",
    height: 400,
  },
};

export function LivraisonInformationTab({ commande }) {
  const dispatch = useDispatch();

  const handleVerifyUser = () => {
    dispatch(updateUserStatus(commande.user, "VERIFIED"));
  };
  const handleBloqueUser = () => {
    dispatch(updateUserStatus(commande.user, "BLOQUED"));
  };

  return (
    <div style={styles.card}>
      <span style={styles.cardHeader}>
        Information Utilisateur sur la livraison:
        <div style={styles.infoContainer}>
          <div style={styles.successButton} onClick={() => handleVerifyUser()}>
            Verifié
          </div>
          <div style={styles.errorButton} onClick={() => handleBloqueUser()}>
            Bloqué
          </div>
          <div style={styles.warningButton}>voir Historique</div>
        </div>
      </span>{" "}
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>status utilisateur:</span>
        <span style={styles.infoValue}>{commande.user?.userStatus}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>nom utilisateur :</span>
        <span style={styles.infoValue}>{commande.user?.name}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>instructions livraison :</span>
        <span style={styles.infoValue}>{commande.instructions}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>numéro téléphone :</span>
        <span style={styles.infoValue}>{commande.phoneNumber}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}> frais livraison :</span>
        <span style={styles.infoValue}>{commande.delivreeFees}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>date création :</span>
        <span style={styles.infoValue}>{commande.createdAt}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>date modification :</span>
        <span style={styles.infoValue}>{commande.updatedAt}</span>
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.infoTitle}>date modification :</span>
        <span style={styles.infoValue}>{commande.updatedAt}</span>
      </div>
      <div style={styles.adressBotton} onClick={() => handleVerifyUser()}>
        <span style={styles.infoTitle}>adress in google map :</span>
      </div>
      <div style={styles.map}>
        <MapViewer
          lat={commande.store?.latitude}
          lng={commande.store?.longitude}
        />
      </div>
    </div>
  );
}
