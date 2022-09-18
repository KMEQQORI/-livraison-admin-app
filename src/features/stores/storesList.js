import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { colors } from "../../css/colors";
import { appConfig } from "../../config";
import { deleteStore, setSelectedStore } from "./storeSlice";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 100,
  },
  storeItem: {
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

export function StoresList({ stores }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteStore = (store) => {
    dispatch(deleteStore(store));
  };

  const handleEditStore = (store) => {
    dispatch(setSelectedStore(store));
    history.push("/stores/edit");
  };

  const handleProduct = (store) => {
    dispatch(setSelectedStore(store));
    history.push("/stores/products");
  };

  return (
    <div style={styles.mainContainer}>
      {stores?.map((store) => {
        return (
          <div style={styles.storeItem} key={store.id}>
            <div style={styles.info}>
              <span style={styles.infoTitle}>id :</span> {store.id}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name :</span> {store.name}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name arabe :</span> {store.nameAr}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>description :</span>{" "}
              {store.description}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}> description arabe :</span>{" "}
              {store.descriptionAr}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}> téléphone :</span>{" "}
              {store.phoneNumber}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}> nbr likes :</span> {store.likes}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}> ouver :</span> {store.open}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}> prix de 1 a 3:</span>{" "}
              {store.costs}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>ordre affichage :</span>{" "}
              {store.order}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>longitude :</span>{" "}
              {store.longitude}
            </div>{" "}
            <div style={styles.info}>
              <span style={styles.infoTitle}>latitude :</span> {store.latitude}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>tags :</span>
              {store?.tags?.map((tag) => (
                <div style={styles.tagContainer} key={tag.id}>
                  <div>{tag.nameAr}</div>
                  <div>{tag.name}</div>
                </div>
              ))}
            </div>
            <img
              alt=""
              style={styles.image}
              src={`${appConfig.apiUrl}/api/static/stores/${store.image}`}
            />
            <div style={styles.buttonsContainer}>
              <div
                style={styles.deleteButton}
                onClick={() => handleDeleteStore(store)}
              >
                <span>supprimer</span>
              </div>
              <div
                style={styles.editButton}
                onClick={() => handleEditStore(store)}
              >
                <span>modifier</span>
              </div>
              <div
                style={styles.productButton}
                onClick={() => handleProduct(store)}
              >
                <span>Produits</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
