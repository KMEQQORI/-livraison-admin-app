import React from "react";
import { colors } from "../../css/colors";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "../home/homeView";
import { NavBar } from "../navBar/navBar";
import { ServicesView } from "../services/servicesView";
import { TagsView } from "../tags/tagsView";
import { CommandesView } from "../commandes/commandesView";
import { UsersView } from "../users/usersView";
import { StoresView } from "../stores/storesView";
import { AuthorizationError } from "../common/autorizationError";
import { CreateServiceView } from "../services/CreateServiceView";
import { CreateTagView } from "../tags/createTagView";
import { useDispatch, useSelector } from "react-redux";
import { selectShowNavBar, setShowNavBar } from "../common/commonSlice";
import { AiFillLeftCircle } from "react-icons/all";
import { CreateStoreView } from "../stores/CreateStoreView";
import { EditStoreView } from "../stores/EditStoreView";
import { ProductsView } from "../products/productsView";
import { NotFoundError } from "../common/notFoundError";
import { CreateProductView } from "../products/CreateProductView";
import { EditProductView } from "../products/EditProductView";
import { CommandeManageView } from "../commandes/manageCommande/commandeManageView";
import { AdsView } from "../ads/adsView";
import { EditAdView } from "../ads/EditAdView";
import { CreateAdView } from "../ads/CreateAdView";
import { EditTagView } from "../tags/EditTagView";
import { EditServiceView } from "../services/EditServiceView";

const styles = {
  mainLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: colors.backgroundGray,
  },
  navBarContainer: {
    width: "100%",
  },
  MainContainer: {
    width: "100%",
    maxWidth: 900,
    backgroundColor: colors.backgroundGray,
    height: "100vh",
    overflowY: "scroll",
  },
  moreButton: {
    width: "100%",
    fontSize: 36,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: "20%",
    fontSize: 36,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    backgroundColor: colors.primary,
  },
  moreIcon: {
    paddingRight: "16",
    width: 36,
    color: colors.white,
  },
  navBar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
};

export function MainContainer() {
  const showNavBar = useSelector(selectShowNavBar);
  const dispatch = useDispatch();

  const handleMenuButton = () => {
    dispatch(setShowNavBar(true));
  };

  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <Router>
      <div style={styles.mainLayout}>
        {showNavBar ? (
          <div style={styles.navBarContainer}>
            <NavBar />
          </div>
        ) : (
          <>
            <div style={styles.navBar}>
              <div style={styles.backButton} onClick={handleBackButton}>
                <AiFillLeftCircle height="small" style={styles.moreIcon} />
              </div>
              <div style={styles.moreButton} onClick={handleMenuButton}>
                Menu
              </div>
            </div>

            <div style={styles.MainContainer}>
              <Switch>
                <Route path="/home">
                  <HomeView />
                </Route>
                <Route path="/services/edit">
                  <EditServiceView />
                </Route>
                <Route path="/services/new">
                  <CreateServiceView />
                </Route>
                <Route path="/services">
                  <ServicesView />
                </Route>
                <Route path="/tags/edit">
                  <EditTagView />
                </Route>
                <Route path="/tags/new">
                  <CreateTagView />
                </Route>
                <Route path="/tags">
                  <TagsView />
                </Route>
                <Route path="/stores/products/edit">
                  <EditProductView />
                </Route>
                <Route path="/stores/products/new">
                  <CreateProductView />
                </Route>
                <Route path="/stores/products">
                  <ProductsView />
                </Route>
                <Route path="/stores/new">
                  <CreateStoreView />
                </Route>
                <Route path="/stores/edit">
                  <EditStoreView />
                </Route>
                <Route path="/stores">
                  <StoresView />
                </Route>
                <Route path="/ads/new">
                  <CreateAdView />
                </Route>
                <Route path="/ads/edit">
                  <EditAdView />
                </Route>
                <Route path="/ads">
                  <AdsView />
                </Route>
                <Route path="/commandes/manage/:id">
                  <CommandeManageView />
                </Route>
                <Route path="/commandes/status/:status">
                  <CommandesView />
                </Route>
                <Route path="/commandes">
                  <CommandesView />
                </Route>
                <Route path="/users">
                  <UsersView />
                </Route>
                <Route path="/unAuthorized">
                  <AuthorizationError />
                </Route>
                <Route path="/ressourceNotFound">
                  <NotFoundError />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}
