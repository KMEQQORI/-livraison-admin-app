import React from "react";
import { colors } from "../../css/colors";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectMenu, selectSelectedTab } from "../common/commonSlice";

const styles = {
  navBarItemMainContainer: {
    width: "100%",
    textDecoration: "none",
    borderBottom: "1px solid",
    borderBottomColor: colors.gray,
  },
  navBarItemContentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderRadius: "2px",
  },
  selected: {
    backgroundColor: colors.darkGray,
  },
  navBarItemTitle: {
    color: "white",
  },
};

export function NavBarItem({ title, icon, link }) {
  const selectedTabName = useSelector(selectSelectedTab);
  const dispatch = useDispatch();

  const isSelected = () => {
    return title === selectedTabName;
  };

  const handleSelectTab = () => {
    dispatch(selectMenu(title));
  };

  return (
    <Link
      style={styles.navBarItemMainContainer}
      onClick={() => handleSelectTab()}
      to={link}
    >
      <div
        style={{
          ...styles.navBarItemContentContainer,
          ...(isSelected() ? styles.selected : null),
        }}
      >
        <span style={styles.navBarItemTitle}>{title}</span>
        {icon}
      </div>
    </Link>
  );
}
