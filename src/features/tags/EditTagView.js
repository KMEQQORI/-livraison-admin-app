import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { retrieveTags } from "../tags/tagSlice";
import { v4 as uuidv4 } from "uuid";
import { appConfig } from "../../config";
import Compressor from "compressorjs";
import {
  editTag,
  selectCreateTagImageId,
  selectSelectedTag,
  uploadTagImage,
} from "./tagSlice";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    paddingBottom: 100,
  },
  createButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: 16,
    margin: 20,
    borderRadius: 8,
    textDecoration: "none",
    cursor: "pointer",
  },
  inputStyle: {
    width: "90%",
    height: 32,
    borderRadius: 4,
    marginTop: 20,
  },
  tagsContainer: {
    marginTop: 32,
    width: "100%",
  },
  tagsBadgeContainer: {
    width: "100%",
  },
  tag: {
    display: "inline-block",
    backgroundColor: colors.white,
    color: colors.darkGray,
    border: `1px solid ${colors.darkGray}`,
    padding: 12,
    margin: 4,
    borderRadius: 8,
    textAlign: "center",
    cursor: "pointer",
  },
  selectedTag: {
    display: "inline-block",
    backgroundColor: colors.darkGray,
    color: colors.white,
    border: `1px solid ${colors.darkGray}`,
    padding: 12,
    margin: 4,
    borderRadius: 8,
    textAlign: "center",
    cursor: "pointer",
  },
  fileContainer: {
    marginTop: 32,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 32,
    marginBottom: 16,
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
  },
  localisationButton: {
    backgroundColor: colors.info,
    color: colors.primary,
    padding: 16,
    margin: 20,
    borderRadius: 8,
    textDecoration: "none",
    cursor: "pointer",
    textAlign: "center",
  },
};

export function EditTagView() {
  const dispatch = useDispatch();

  const selectedTag = useSelector(selectSelectedTag);
  const createTagImageId = useSelector(selectCreateTagImageId);

  const [name, setName] = useState(selectedTag.name);
  const [nameAr, setNameAr] = useState(selectedTag.nameAr);
  const [order, setOrder] = useState(selectedTag.order);

  const handleSelectFile = (event) => {
    const image = event.target.files[0];
    new Compressor(image, {
      quality: 0.4,
      width: 800,
      success(compressedImage) {
        const generatedImageId = uuidv4();
        const data = new FormData();
        data.append("file", compressedImage);
        data.append("imageId", generatedImageId);
        dispatch(uploadTagImage(data));
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleSubmitTag = () => {
    const body = {
      id: selectedTag.id,
      name,
      nameAr,
      order,
      image: createTagImageId || selectedTag.image,
    };
    dispatch(editTag(body));
  };

  useEffect(() => {
    dispatch(retrieveTags());
  }, [dispatch, createTagImageId]);

  return (
    <div style={styles.mainContainer}>
      <span>Editer la boutique</span>
      <input
        placeholder="Nom Tag"
        style={styles.inputStyle}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="Nom Tag en Arabe"
        style={styles.inputStyle}
        value={nameAr}
        onChange={(event) => setNameAr(event.target.value)}
      />
      <input
        placeholder="Order Apparation"
        style={styles.inputStyle}
        value={order}
        onChange={(event) => setOrder(event.target.value)}
      />
      <div style={styles.fileContainer}>
        <input
          type="file"
          onChange={handleSelectFile}
          accept="image/png,image/jpeg"
        />
        {(createTagImageId || selectedTag.image) && (
          <img
            alt=""
            style={styles.image}
            src={`${appConfig.apiUrl}/api/static/tags/${
              createTagImageId || selectedTag.image
            }`}
          />
        )}
      </div>
      <Link to={"/tags"} style={styles.createButton} onClick={handleSubmitTag}>
        Editer la boutique
      </Link>
    </div>
  );
}
