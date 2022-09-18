import React from "react";
import { ImBlocked } from "react-icons/all";
import { colors } from "../../css/colors";
import { useDispatch } from "react-redux";
import {deleteToken} from "./commonSlice";

const styles = {
  mainContainer: {
    height: "100vh",
    width: "100",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    fontSize: 26,
    color: colors.gray,
  },
  icon: {
    fontSize: 200,
    padding: 64,
  },
  changeTokenButton: {
    fontSize: 16,
    margin: 32,
    padding: 16,
    backgroundColor: colors.darkGray,
    color: colors.white,
    borderRadius: 4,
    border: "1px solid",
    borderColor: colors.darkGray,
    cursor: "pointer",
  },
};

export function AuthorizationError() {
  const dispatch = useDispatch();
  const handleChangeToken = () => {
    dispatch(deleteToken());
  };
  return (
    <div style={styles.mainContainer}>
      <ImBlocked style={styles.icon} />
      <span>You are not authorized</span>
      <span style={styles.changeTokenButton} onClick={handleChangeToken}>
        Change token
      </span>
    </div>
  );
}
