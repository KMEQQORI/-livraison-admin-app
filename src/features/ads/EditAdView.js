import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { retrieveTags, selectTags } from "../tags/tagSlice";
import { v4 as uuidv4 } from "uuid";
import { appConfig } from "../../config";
import {
  editAd,
  selectCreateAdImageId,
  selectSelectedAd,
  uploadAdImage,
} from "./adSlice";
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
    marginTop: 32,
    marginBottom: 16,
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
  },
};

export function EditAdView() {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const selectedAd = useSelector(selectSelectedAd);
  const createAdImageId = useSelector(selectCreateAdImageId);

  const [name, setName] = useState(selectedAd.name);
  const [order, setOrder] = useState(selectedAd.order);
  const [selectedTags, setSelectedTags] = useState(selectedAd.tags);

  const isTagSelected = (tag) => {
    return selectedTags.find((selectedTag) => tag.id === selectedTag.id);
  };

  const handleSelectTag = (tag) => {
    if (isTagSelected(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag.id !== tag.id)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

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
        dispatch(uploadAdImage(data));
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleSubmitAd = () => {
    const body = {
      id: selectedAd.id,
      name,
      order,
      image: createAdImageId || selectedAd.image,
      tags: selectedTags?.map((selectedTag) => selectedTag.id),
    };
    dispatch(editAd(body));
  };

  useEffect(() => {
    dispatch(retrieveTags());
  }, [dispatch, createAdImageId]);

  return (
    <div style={styles.mainContainer}>
      <span>Editer la boutique</span>
      <input
        placeholder="Nom Ad"
        style={styles.inputStyle}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="Order Apparation"
        style={styles.inputStyle}
        value={order}
        onChange={(event) => setOrder(event.target.value)}
      />
      <div style={styles.tagsContainer}>
        <div>select Ad tags</div>
        <div style={styles.tagsBadgeContainer}>
          {tags?.map((tag) => (
            <div
              style={isTagSelected(tag) ? styles.selectedTag : styles.tag}
              onClick={() => handleSelectTag(tag)}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.fileContainer}>
        <input
          type="file"
          onChange={handleSelectFile}
          accept="image/png,image/jpeg"
        />
        {(createAdImageId || selectedAd.image) && (
          <img
            alt=""
            style={styles.image}
            src={`${appConfig.apiUrl}/api/static/ads/${
              createAdImageId || selectedAd.image
            }`}
          />
        )}
      </div>
      <Link to={"/ads"} style={styles.createButton} onClick={handleSubmitAd}>
        Editer la boutique
      </Link>
    </div>
  );
}
