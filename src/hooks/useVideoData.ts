import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { videoData } from "../constants/Data";
// import { setSelectedCategory } from "../slices/categorySlice";

export const useVideoData = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const video = useMemo(() => {
    return videoData.categories
      .flatMap(c => c.contents)
      .find(v => v.slug === id);
  }, [id]);

  const category = useMemo(() => {
    return videoData.categories.find(c => c.contents.some(v => v.slug === id))?.category.name;
  }, [id]);

  useEffect(() => {
    if (category) {
      // dispatch(setSelectedCategory(category));
    }
  }, [category, dispatch]);

  return { video, id };
};
