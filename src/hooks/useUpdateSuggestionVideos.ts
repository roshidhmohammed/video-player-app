import { useEffect } from 'react'
import type { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { videoData } from '../constants/Data';
import { selectedCategoryVideos } from '../slices/videoSlice';

const useUpdateSuggestionVideos = () => {
    const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
    const suggestionVideos = useSelector((state: RootState) => state.video.suggestionVideos);
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredData =videoData.categories.filter(c => (selectedCategory === "All") ? c.category.name !== selectedCategory : c.category.name === selectedCategory)
        // filteredData?.contents?.filter((i) => i.contents).map((i) => i.contents.map((j) => dispatch(selectedCategoryVideos(j))));
     dispatch(selectedCategoryVideos(filteredData));
    }, [selectedCategory]);



  return suggestionVideos
}

export default useUpdateSuggestionVideos