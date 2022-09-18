import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { retrieveTags, selectTags } from "../tags/tagSlice";
import { v4 as uuidv4 } from "uuid";
import { appConfig } from "../../config";
import {
  createStore,
  selectCreateStoreImageId,
  uploadStoreImage,
} from "./storeSlice";
import Compressor from "compressorjs";
import { MapViewer } from "../common/MapViewer";
import { getLocalisation } from "./localisationUtils";

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
    marginTop: 96,
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
  localisationContainer: {
    width: "90%",
    height: 400,
    margin: 32,
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

export function CreateStoreView() {
  const tags = useSelector(selectTags);
  const createStoreImageId = useSelector(selectCreateStoreImageId);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [order, setOrder] = useState("");
  const [likes, setLikes] = useState("");
  const [costs, setCosts] = useState("");
  const [open, setOpen] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [selectedTags, setSelectedTags] = useState([]);

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

  const handlePositionSaving = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
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
        dispatch(uploadStoreImage(data));
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleSubmitStore = () => {
    const body = {
      name,
      nameAr,
      description,
      descriptionAr,
      order,
      likes,
      open,
      phoneNumber,
      costs,
      latitude,
      longitude,
      image: createStoreImageId,
      tags: selectedTags?.map((selectedTag) => selectedTag.id),
    };
    dispatch(createStore(body));
  };

  useEffect(() => {
    dispatch(retrieveTags());
  }, [dispatch, createStoreImageId]);

  return (
    <div style={styles.mainContainer}>
      <span>new Store</span>
      <input
        placeholder="Nom Store"
        style={styles.inputStyle}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="Nom Store en Arabe"
        style={styles.inputStyle}
        value={nameAr}
        onChange={(event) => setNameAr(event.target.value)}
      />
      <input
        placeholder="Description Store"
        style={styles.inputStyle}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        placeholder="Description Store en Arabe"
        style={styles.inputStyle}
        value={descriptionAr}
        onChange={(event) => setDescriptionAr(event.target.value)}
      />
      <input
        placeholder="numero telephone"
        style={styles.inputStyle}
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <input
        placeholder="likes"
        style={styles.inputStyle}
        value={likes}
        onChange={(event) => setLikes(event.target.value)}
      />
      <input
        placeholder="ouvert ? OPEN : CLOSE"
        style={styles.inputStyle}
        value={open}
        onChange={(event) => setOpen(event.target.value)}
      />
      <input
        placeholder="costs : de 1 a 3"
        style={styles.inputStyle}
        value={costs}
        onChange={(event) => setCosts(event.target.value)}
      />
      <input
        placeholder="Order Apparation"
        style={styles.inputStyle}
        value={order}
        onChange={(event) => setOrder(event.target.value)}
      />
      <input
        placeholder="Longitude"
        style={styles.inputStyle}
        value={longitude}
        onChange={(event) => setLongitude(event.target.value)}
      />
      <input
        placeholder="latitude"
        style={styles.inputStyle}
        value={latitude}
        onChange={(event) => setLatitude(event.target.value)}
      />
      <div style={styles.tagsContainer}>
        <div>select store tags</div>
        <div style={styles.tagsBadgeContainer}>
          {tags?.map((tag) => (
            <div
              style={isTagSelected(tag) ? styles.selectedTag : styles.tag}
              onClick={() => handleSelectTag(tag)}
              key={tag.id}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.localisationContainer}>
        <div
          style={styles.localisationButton}
          onClick={() => getLocalisation(handlePositionSaving)}
        >
          tager la localisation
        </div>
        {latitude && longitude && <MapViewer lat={latitude} lng={longitude} />}
      </div>
      <div style={styles.fileContainer}>
        <input
          type="file"
          onChange={handleSelectFile}
          accept="image/png,image/jpeg"
        />
        {createStoreImageId && (
          <img
            alt=""
            style={styles.image}
            src={`${appConfig.apiUrl}/api/static/stores/${createStoreImageId}`}
          />
        )}
      </div>
      <Link
        to={"/stores"}
        style={styles.createButton}
        onClick={handleSubmitStore}
      >
        create new store
      </Link>
    </div>
  );
}
