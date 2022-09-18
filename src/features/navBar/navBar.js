import React from "react";
import { colors } from "../../css/colors";
import { NavBarItem } from "./navBarItem";

const styles = {
  navBarMainContainer: {
    width: "100%",
    minHeight: "100vh",
    maxWidth: 700,
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  logoutButton: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 100,
    width: "100%",
  },
  section: {
    width: "100%",
    borderBottom: "1px solid",
    borderBottomColor: colors.gray,
  },
  sectionHeader: {
    width: "100%",
  },
  sectionContent: {
    marginLeft: 24,
  },
  mainItems: {
    marginTop: 32,
    width: "100%",
  },
};

export function NavBar() {
  return (
    <div style={styles.navBarMainContainer}>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <NavBarItem title="toutes les commandes" link="/commandes" />
        </div>
        <div style={styles.sectionContent}>
          <NavBarItem
            title="commandes en attentes"
            link="/commandes/status/CREATED"
          />
          <NavBarItem
            title="commandes en cheking"
            link="/commandes/status/CHEKING"
          />
          <NavBarItem
            title="commandes acceptées"
            link="/commandes/status/ACCEPTED"
          />
          <NavBarItem
            title="commandes refusées"
            link="/commandes/status/REFUSED"
          />
          <NavBarItem
            title="commandes annulées"
            link="/commandes/status/CANCELED"
          />
          <NavBarItem
            title="commande livrées"
            link="/commandes/status/DELIVERED"
          />
          <NavBarItem
            title="commande non réussis"
            link="/commandes/status/FAILED"
          />
        </div>
      </div>

      <div style={styles.mainItems}>
        <NavBarItem title="Services" link="/services" />
        <NavBarItem title="Tags" link="/tags" />
        <NavBarItem title="Stores" link="/stores" />
        <NavBarItem title="Ads" link="/ads" />
      </div>

      <div style={styles.logoutButton}>
        <NavBarItem title="Se deconnecter" link="/stores" />
      </div>
    </div>
  );
}
