import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { retrieveTags } from "../tags/tagSlice";
import { v4 as uuidv4 } from "uuid";
import { appConfig } from "../../config";
import { createTag, selectCreateTagImageId, uploadTagImage } from "./tagSlice";
import Compressor from "compressorjs";

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
  image: {
    margin: 32,
    width: 150,
    height: 150,
    objectFit: "cover",
  },
  fileContainer: {
    marginTop: 32,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export function CreateTagView() {
  const createTagImageId = useSelector(selectCreateTagImageId);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [order, setOrder] = useState("1");

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

  const handleSubmitService = () => {
    const body = {
      name,
      nameAr,
      order,
      image: createTagImageId,
    };
    dispatch(createTag(body));
  };

  useEffect(() => {
    dispatch(retrieveTags());
  }, [dispatch, createTagImageId]);

  return (
    <div style={styles.mainContainer}>
      <span>new Tag</span>

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
        placeholder="Order d'Apparation"
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
        {createTagImageId && (
          <img
            alt=""
            style={styles.image}
            src={`${appConfig.apiUrl}/api/static/tags/${createTagImageId}`}
          />
        )}
      </div>
      <Link
        to={"/tags"}
        style={styles.createButton}
        onClick={handleSubmitService}
      >
        create new Service
      </Link>
    </div>
  );
}
