import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../css/colors";
import { Link } from "react-router-dom";
import { TagsList } from "./tagsList";
import { retrieveTags, selectTags } from "./tagSlice";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: 16,
    margin: 20,
    borderRadius: 4,
    textDecoration: "none",
  },
};

export function TagsView() {
  const tags = useSelector(selectTags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTags());
  }, [dispatch]);

  return (
    <div style={styles.mainContainer}>
      <Link style={styles.createButton} to="/tags/new">
        <span>New Tag</span>
      </Link>
      {tags && <TagsList tags={tags} />}
    </div>
  );
}
