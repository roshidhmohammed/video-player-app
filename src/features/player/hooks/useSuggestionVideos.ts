import { useEffect } from "react";
import type { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { videoData } from "../../../shared/constants/Data";
import { selectedCategoryVideos } from "../../../shared/slices/video.slice";

const useSuggestionVideos = () => {
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory,
  );
  const suggestionVideos = useSelector(
    (state: RootState) => state.video.suggestionVideos,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredData = videoData.categories.filter((c) =>
      selectedCategory === "All"
        ? c.category.name !== selectedCategory
        : c.category.name === selectedCategory,
    );
    dispatch(selectedCategoryVideos(filteredData));
  }, [selectedCategory]);

  return suggestionVideos;
};

export default useSuggestionVideos;
