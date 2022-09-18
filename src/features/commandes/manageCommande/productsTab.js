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
    marginTop: 4,
  },
  infoTitle: {
    color: colors.gray,
  },
  infoValue: {
    color: colors.secondary,
  },
  cartItem: {
    display: "flex",
  },
  cartItemInformation: {
    flex: 0.7,
    height: 100,
  },
  cartItemImage: {
    flex: 0.3,
  },
  productImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
};

export function ProductTab({ commandeProducts }) {
  return (
    <div style={styles.card}>
      <span style={styles.cardHeader}>Contenu commande:</span>
      {commandeProducts?.map((cartItem) => {
        return (
          <div style={styles.cartItem}>
            <div style={styles.cartItemInformation}>
              <div style={styles.infoContainer}>
                <span style={styles.infoTitle}>nom :</span>
                <span style={styles.infoValue}>{cartItem.product?.name}</span>
              </div>
              <div style={styles.infoContainer}>
                <span style={styles.infoTitle}>prix :</span>
                <span style={styles.infoValue}>{cartItem.product?.price}</span>
              </div>
              <div style={styles.infoContainer}>
                <span style={styles.infoTitle}>quantité :</span>
                <span style={styles.infoValue}>{cartItem.amount}</span>
              </div>
            </div>
            <div style={styles.cartItemImage}>
              <img
                alt=""
                style={styles.productImage}
                src={`${appConfig.apiUrl}/api/static/products/${cartItem.product.image}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
