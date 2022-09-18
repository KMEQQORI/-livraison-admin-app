import React from "react";
import { colors } from "../../../css/colors";
import { useDispatch } from "react-redux";
import { controlCommande } from "../commandesSlice";

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
  controlContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  controlHelp: {
    color: colors.gray,
    textAlign: "center",
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
  successButton: {
    padding: "16px 32px",
    margin: 16,
    borderRadius: 6,
    backgroundColor: colors.success,
    color: colors.white,
  },
};

export function ControlTab({ commande }) {
  const dispatch = useDispatch();
  const handleControlClick = (action) => {
    dispatch(controlCommande(commande.id, action));
  };

  return (
    <div style={styles.card}>
      <span style={styles.cardHeader}>Controller la commande:</span>
      <div style={styles.controlContainer}>
        <span style={styles.controlHelp}>
          vous etes en train de valider la commande ? alors passer la commande
          en validation
        </span>
        <div
          style={styles.warningButton}
          onClick={() => handleControlClick("check")}
        >
          START CHECK
        </div>
      </div>
      <div style={styles.controlContainer}>
        <span style={styles.controlHelp}>
          la commande vous parrez incomplete ou invalide ? refusez cette
          commande
        </span>
        <div
          style={styles.errorButton}
          onClick={() => handleControlClick("refuse")}
        >
          REFUSE
        </div>
      </div>
      <div style={styles.controlContainer}>
        <span style={styles.controlHelp}>
          l'utilisateur veut annuler la commande ??
        </span>
        <div
          style={styles.errorButton}
          onClick={() => handleControlClick("cancel")}
        >
          CANCEL
        </div>
      </div>
      <div style={styles.controlContainer}>
        <span style={styles.controlHelp}>
          la commande vous parrez complete et bonne ? envoyer cette commande au
          livreur
        </span>
        <div
          style={styles.successButton}
          onClick={() => handleControlClick("accept")}
        >
          ACCEPT
        </div>
      </div>
      <div style={styles.controlContainer}>
        <span style={styles.controlHelp}>
          Le livreur a reussis a recupere la commande ? notify l'utilisateur de
          cette bonne nouvelle
        </span>
        <div
          style={styles.warningButton}
          onClick={() => handleControlClick("collect")}
        >
          COLLECT
        </div>
      </div>
      <div style={styles.controlContainer}>
        <span style={styles.controlHelp}>Livraison reussis ?</span>
        <div
          style={styles.successButton}
          onClick={() => handleControlClick("deliver")}
        >
          DELIVER
        </div>
      </div>
      <div style={styles.controlContainer}>
        <span style={styles.controlHelp}>
          Le livreur n'as pas reussis a rejoindre l'utilisateur ?
        </span>
        <div
          style={styles.errorButton}
          onClick={() => handleControlClick("fail")}
        >
          FAILED
        </div>
      </div>
    </div>
  );
}
