import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoFeed from "./VideoFeed";
import CategoryFilter from "./CategoryFilter";
import { videoData } from "../../../shared/constants/Data";
import { motion, AnimatePresence } from "framer-motion";
import { setSelectedCategory } from "../state/category.slice";
import type { RootState } from "../../../app/store";
import MiniPlayer from "../../player/components/MiniPlayer";
// import { MiniPlayer } from "@/features/player"

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory,
  );

  const isMinimized = useSelector(
    (state: RootState) => state.player.isMinimized,
  );

  const categories = useMemo(() => {
    const allCategories = videoData.categories.map((c) => c.category.name);
    return ["All", ...allCategories];
  }, []);

  const filteredData = useMemo(() => {
    if (selectedCategory === "All") return videoData.categories;
    return videoData.categories.filter(
      (c) => c.category.name === selectedCategory,
    );
  }, [selectedCategory]);

  if (!filteredData) return;

  return (
    <div className="h-screen overflow-auto  bg-black text-white">
      {isMinimized && (
        <div className="  bottom-0 z-50 md:h-80 h-50 right-0 md:left-150 lg:left-200 left-0  fixed overflow-hidden">
          <MiniPlayer />
        </div>
      )}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(c) => dispatch(setSelectedCategory(c))}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <VideoFeed data={filteredData} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
