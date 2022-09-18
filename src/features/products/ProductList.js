import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { colors } from "../../css/colors";
import { appConfig } from "../../config";
import {
  deleteProduct,
  duplicateProduct,
  setSelectedProduct,
} from "./productSlice";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 100,
  },
  productItem: {
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
  deleteButton: {
    color: colors.error,
    border: `1px solid ${colors.error}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
    margin: 16,
  },
  buttonContainer: {
    display: "flex",
  },
  editButton: {
    color: colors.warning,
    border: `1px solid ${colors.warning}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
    margin: 16,
  },
  duplicateButton: {
    color: colors.success,
    border: `1px solid ${colors.success}`,
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
  },
};

export function ProductList({ products }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product));
  };

  const handleEditProduct = (product) => {
    dispatch(setSelectedProduct(product));
    history.push("/stores/products/edit");
  };

  const handleDuplicateProduct = (product) => {
    dispatch(duplicateProduct(product));
  };

  return (
    <div style={styles.mainContainer}>
      {products?.map((product) => {
        return (
          <div style={styles.productItem} key={product.id}>
            <div style={styles.info}>
              <span style={styles.infoTitle}>id : </span> {product.id}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name : </span>
              {product.name}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name arabe : </span>
              {product.nameAr}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>description : </span>
              {product.description}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>description arabe : </span>
              {product.descriptionAr}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>prix : </span>
              {product.price}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>unité : </span>
              {product.unit}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>text unité : </span>
              {product.unitText}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>text arabe unité : </span>
              {product.unitTextAr}
            </div>
            <img
              alt=""
              style={styles.image}
              src={`${appConfig.apiUrl}/api/static/products/${product.image}`}
            />
            <div style={styles.buttonContainer}>
              <div
                style={styles.deleteButton}
                onClick={() => handleDeleteProduct(product)}
              >
                <span>supprimer</span>
              </div>
              <div
                style={styles.editButton}
                onClick={() => handleEditProduct(product)}
              >
                <span>editer</span>
              </div>
              <div
                style={styles.duplicateButton}
                onClick={() => handleDuplicateProduct(product)}
              >
                <span>dupliquer</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
