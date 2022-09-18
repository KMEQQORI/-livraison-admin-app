import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { appConfig } from "../../config";
import {
  createProduct,
  selectCreateProductImageId,
  uploadProductImage,
} from "./productSlice";
import { selectSelectedStore } from "../stores/storeSlice";
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
    margin: 32,
    width: 150,
    height: 150,
    objectFit: "cover",
  },
};

export function CreateProductView() {
  const createProductImageId = useSelector(selectCreateProductImageId);
  const selectedStore = useSelector(selectSelectedStore);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [category, setCategory] = useState("");
  const [categoryAr, setCategoryAr] = useState("");
  const [unitText, setUnitText] = useState("");
  const [unitTextAr, setUnitTextAr] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  const handleSelectFile = (event) => {
    const image = event.target.files[0];
    new Compressor(image, {
      quality: 0.6,
      width: 840,
      success(compressedImage) {
        const generatedImageId = uuidv4();
        const data = new FormData();
        data.append("file", compressedImage);
        data.append("imageId", generatedImageId);
        dispatch(uploadProductImage(data));
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleSubmitProduct = () => {
    const body = {
      idStore: selectedStore.id,
      name,
      nameAr,
      description,
      descriptionAr,
      category,
      categoryAr,
      unit,
      price,
      unitText,
      unitTextAr,
      image: createProductImageId,
    };
    dispatch(createProduct(body));
  };

  return (
    <div style={styles.mainContainer}>
      <span>new Product</span>

      <input
        placeholder="Nom produit"
        style={styles.inputStyle}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="Nom produit en Arabe"
        style={styles.inputStyle}
        value={nameAr}
        onChange={(event) => setNameAr(event.target.value)}
      />
      <input
        placeholder="description produit"
        style={styles.inputStyle}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        placeholder="description produit en Arabe"
        style={styles.inputStyle}
        value={descriptionAr}
        onChange={(event) => setDescriptionAr(event.target.value)}
      />
      <input
        placeholder="Category Store"
        style={styles.inputStyle}
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />
      <input
        placeholder="Category Store en Arabe"
        style={styles.inputStyle}
        value={categoryAr}
        onChange={(event) => setCategoryAr(event.target.value)}
      />
      <input
        placeholder="text unité produit"
        style={styles.inputStyle}
        value={unitText}
        onChange={(event) => setUnitText(event.target.value)}
      />
      <input
        placeholder="text unité produit en Arabe"
        style={styles.inputStyle}
        value={unitTextAr}
        onChange={(event) => setUnitTextAr(event.target.value)}
      />
      <input
        placeholder="prix produit"
        style={styles.inputStyle}
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <input
        placeholder="unité produit"
        style={styles.inputStyle}
        value={unit}
        onChange={(event) => setUnit(event.target.value)}
      />

      <div style={styles.fileContainer}>
        <input
          type="file"
          onChange={handleSelectFile}
          accept="image/png,image/jpeg"
        />
        {createProductImageId && (
          <img
            alt=""
            style={styles.image}
            src={`${appConfig.apiUrl}/api/static/products/${createProductImageId}`}
          />
        )}
      </div>
      <Link
        to={"/stores/products"}
        style={styles.createButton}
        onClick={handleSubmitProduct}
      >
        create new Product
      </Link>
    </div>
  );
}
