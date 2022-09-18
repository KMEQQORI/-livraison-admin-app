import React from "react";
import { useDispatch } from "react-redux";
import { colors } from "../../css/colors";
import { appConfig } from "../../config";
import { deleteService, setSelectedService } from "./serviceSlice";
import { useHistory } from "react-router-dom";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 100,
  },
  serviceItem: {
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
    borderRadius: 4,
    margin: 4,
    backgroundColor: colors.darkGray,
    color: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    display: "inline-block",
    color: colors.error,
    border: `1px solid ${colors.error}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
    margin: 16,
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
  info: {
    width: "80%",
    padding: 8,
  },
  infoTitle: {
    color: colors.darkGray,
  },
};

export function ServicesList({ services }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteService = (service) => {
    dispatch(deleteService(service));
  };

  const handleEditService = (service) => {
    dispatch(setSelectedService(service));
    history.push("/services/edit");
  };

  return (
    <div style={styles.mainContainer}>
      {services?.map((service) => {
        return (
          <div style={styles.serviceItem} key={service.id}>
            <div style={styles.info}>
              <span style={styles.infoTitle}>id :</span> {service.id}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name :</span>
              {service.name}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name arabe :</span>
              {service.nameAr}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>ordre affichage :</span>
              {service.order}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>tags :</span>
              {service?.tags?.map((tag) => (
                <div style={styles.tagContainer} key={tag.id}>
                  <div>{tag.nameAr}</div>
                  <div>{tag.name}</div>
                </div>
              ))}
            </div>
            <img
              alt=""
              style={styles.image}
              src={`${appConfig.apiUrl}/api/static/services/${service.image}`}
            />
            <div>
              <div
                style={styles.deleteButton}
                onClick={() => handleDeleteService(service)}
              >
                <span>supprimer</span>
              </div>
              <div
                style={styles.editButton}
                onClick={() => handleEditService(service)}
              >
                <span>modifier</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
