import React from "react";
import { useDispatch } from "react-redux";
import { colors } from "../../css/colors";
import { appConfig } from "../../config";
import { deleteTag, setSelectedTag } from "./tagSlice";
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
  deleteButton: {
    display: "inline-block",
    color: colors.error,
    border: `1px solid ${colors.error}`,
    padding: 16,
    borderRadius: 4,
    cursor: "pointer",
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

export function TagsList({ tags }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteTag = (tag) => {
    dispatch(deleteTag(tag));
  };
  const handleEditTag = (tag) => {
    dispatch(setSelectedTag(tag));
    history.push("/tags/edit");
  };

  return (
    <div style={styles.mainContainer}>
      {tags?.map((tag) => {
        return (
          <div style={styles.serviceItem} key={tag.id}>
            <div style={styles.info}>
              <span style={styles.infoTitle}>id :</span>
              {tag.id}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name :</span> {tag.name}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>name arabe :</span>
              {tag.nameAr}
            </div>
            <div style={styles.info}>
              <span style={styles.infoTitle}>ordre affichage :</span>
              {tag.order}
            </div>
            <img
              alt=""
              style={styles.image}
              src={`${appConfig.apiUrl}/api/static/tags/${tag.image}`}
            />
            <div>
              <div
                style={styles.deleteButton}
                onClick={() => handleDeleteTag(tag)}
              >
                <span>supprimer</span>
              </div>
              <div style={styles.editButton} onClick={() => handleEditTag(tag)}>
                <span>modifier</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
