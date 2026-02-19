import { useEffect, useMemo } from "react";

// router-dom - navigation
import { useParams } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";

// mock data for video card or feed
import { videoData } from "../constants/Data";

export const useVideoData = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const video = useMemo(() => {
    return videoData.categories
      .flatMap((c) => c.contents)
      .find((v) => v.slug === id);
  }, [id]);

  const category = useMemo(() => {
    return videoData.categories.find((c) =>
      c.contents.some((v) => v.slug === id),
    )?.category.name;
  }, [id]);

  useEffect(() => {}, [category, dispatch]);

  return { video, id };
};
