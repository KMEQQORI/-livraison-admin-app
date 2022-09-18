import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { appConfig } from "../../config";
import {
  editProduct,
  selectCreateProductImageId,
  selectSelectedProduct,
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

export function EditProductView() {
  const dispatch = useDispatch();
  const selectedStore = useSelector(selectSelectedStore);
  const selectedProduct = useSelector(selectSelectedProduct);
  const createProductImageId = useSelector(selectCreateProductImageId);

  const [name, setName] = useState(selectedProduct.name);
  const [nameAr, setNameAr] = useState(selectedProduct.nameAr);
  const [description, setDescription] = useState(selectedProduct.description);
  const [descriptionAr, setDescriptionAr] = useState(
    selectedProduct.descriptionAr
  );
  const [unitText, setUnitText] = useState(selectedProduct.unitText);
  const [unitTextAr, setUnitTextAr] = useState(selectedProduct.unitTextAr);
  const [price, setPrice] = useState(selectedProduct.price);
  const [unit, setUnit] = useState(selectedProduct.unit);

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
        dispatch(uploadProductImage(data));
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleSubmitProduct = () => {
    const body = {
      id: selectedProduct.id,
      idStore: selectedStore.id,
      name,
      nameAr,
      description,
      descriptionAr,
      unit,
      price,
      unitText,
      unitTextAr,
      image: createProductImageId || selectedProduct.image,
    };
    dispatch(editProduct(body));
  };

  return (
    <div style={styles.mainContainer}>
      <span>Editer le produit</span>
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
        {(createProductImageId || selectedProduct.image) && (
          <img
            alt=""
            style={styles.image}
            src={`${appConfig.apiUrl}/api/static/products/${
              createProductImageId || selectedProduct.image
            }`}
          />
        )}
      </div>
      <Link
        to={"/stores/products"}
        style={styles.createButton}
        onClick={handleSubmitProduct}
      >
        Editer le produit
      </Link>
    </div>
  );
}
