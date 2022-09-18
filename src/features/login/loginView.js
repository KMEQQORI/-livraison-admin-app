import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { retreiveToken, setJWTToken } from "../common/commonSlice";
import { colors } from "../../css/colors";

const styles = {
  mainContainer: {
    backgroundColor: colors.backgroundGray,
    flex: 1,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "24px",
  },
  siteName: {
    color: colors.primary,
    fontSize: "50px",
    fontWeight: 700,
  },
  secondarySiteName: {
    color: colors.darkGray,
    fontSize: "25px",
    fontWeight: 500,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: colors.darkGray,
    fontSize: "24px",
    fontWeight: 500,
    padding: "8px",
    width: "80vw",
    borderRadius: "12px",
  },
  loginButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: "12px 24px",
    margin: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export function LoginView() {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  useEffect(() => {
    dispatch(retreiveToken());
  }, [dispatch]);

  const handleInputChange = (event) => {
    setToken(event.target.value);
  };

  const handleSubmitToken = () => {
    dispatch(setJWTToken(token));
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.logoContainer}>
        <span style={styles.siteName}>Livraison </span>
        <span style={styles.secondarySiteName}>Rapide</span>
      </div>
      <div style={styles.loginContainer}>
        <input
          value={token}
          onChange={(event) => handleInputChange(event)}
          style={styles.input}
        />
      </div>
      <div style={styles.loginButton} onClick={handleSubmitToken}>
        Login
      </div>
    </div>
  );
}
