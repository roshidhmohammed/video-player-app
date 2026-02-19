import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { VideoCardProps } from "../types/feed.types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { removeActiveVideo, updateCurrentTime, updateIsMinimized } from "../../player/state/player.slice";
import clsx from "clsx";


const VideoCard: React.FC<VideoCardProps> = ({ video, categoryName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const isMinimized = useSelector(
    (state: RootState) => state.player.isMinimized,
  );

  

  const viewDetailedVideo = (slug: string) => {
    if (isMinimized) {
      dispatch(removeActiveVideo());
      dispatch(updateIsMinimized(false));
    }
    dispatch(updateCurrentTime(0))
    navigate(`/${slug}`);
  };

  return (
    <motion.div
      layoutId={`video-container-${video.slug}`}
      className="group cursor-pointer flex flex-col gap-2 min-h-80"
      onClick={() => viewDetailedVideo(video.slug)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Thumbnail Section */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors w-full">
        <motion.img
          layoutId={`thumbnail-${video.slug}`}
          src={video.thumbnailUrl}
          alt={video.title}
          loading={"eager"}
          
          onLoad={() => setLoaded(true)}
  className={clsx(
    "transition-opacity duration-500 w-full h-auto block",
    loaded ? "opacity-100 " : "opacity-20 h-auto"
  )}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Category Badge */}
        {categoryName && (
          <div className="absolute top-2 right-1 p-2 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md text-[12px] font-bold text-white shadow-lg border border-white/10 ">
            {categoryName}
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-1.5 right-1.5 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-medium text-white border border-white/10">
          {video.duration}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1 p-1">
        <motion.h3
          layoutId={`title-${video.slug}`}
          className="font-semibold text-sm leading-tight line-clamp-2 text-white/90 group-hover:text-blue-400 transition-colors"
        >
          {video.title}
        </motion.h3>
      </div>
    </motion.div>
  );
};

export default VideoCard;
