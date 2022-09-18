import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { colors } from "../../css/colors";
import { appConfig } from "../../config";
import { deleteAd, setSelectedAd } from "./adSlice";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 100,
  },
  adItem: {
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
    marginBottom: 16,
    width: 300,
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
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
  buttonsContainer: {},
  deleteButton: {
    display: "inline-block",
    color: colors.error,
    border: `1px solid ${colors.error}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
    margin: 4,
  },
  editButton: {
    display: "inline-block",
    color: colors.warning,
    border: `1px solid ${colors.warning}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
    margin: 4,
  },
  productButton: {
    display: "inline-block",
    backgroundColor: colors.success,
    color: colors.white,
    border: `1px solid ${colors.success}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
    margin: 4,
  },
  info: {
    width: "80%",
    padding: 8,
  },
  infoTitle: {
    color: colors.darkGray,
  },
};

export function AdsList({ ads }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteAd = (ad) => {
    dispatch(deleteAd(ad));
  };

  const handleEditAd = (ad) => {
    dispatch(setSelectedAd(ad));
    history.push("/ads/edit");
  };

  return (
    <div style={styles.mainContainer}>
      {ads?.map((ad) => {
        return (
          <div style={styles.adItem} key={ad.id}>
            <div style={styles.info}>
              <span style={styles.infoTitle}>id :</span> {ad.id}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name :</span> {ad.name}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>tags :</span>
              {ad?.tags?.map((tag) => (
                <div style={styles.tagContainer} key={tag.id}>
                  <div>{tag.nameAr}</div>
                  <div>{tag.name}</div>
                </div>
              ))}
            </div>
            <img
              alt=""
              style={styles.image}
              src={`${appConfig.apiUrl}/api/static/ads/${ad.image}`}
            />
            <div style={styles.buttonsContainer}>
              <div
                style={styles.deleteButton}
                onClick={() => handleDeleteAd(ad)}
              >
                <span>supprimer</span>
              </div>
              <div style={styles.editButton} onClick={() => handleEditAd(ad)}>
                <span>modifier</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
