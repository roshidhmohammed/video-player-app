import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { VideoContent } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActiveVideo,
  updateIsMinimized,
} from "../../slices/videoPlayerSlice";
import type { RootState } from "../../store";

interface VideoCardProps {
  video: VideoContent;
  categoryName?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, categoryName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMinimized = useSelector(
    (state: RootState) => state.player.isMinimized,
  );

  const viewDetailedVideo = (slug: string) => {
    if (isMinimized) {
      dispatch(removeActiveVideo());
      dispatch(updateIsMinimized());
    }
    navigate(`/${slug}`);
  };

  useEffect(() => {}, [video]);

  return (
    <motion.div
      layoutId={`video-container-${video.slug}`}
      className="group cursor-pointer flex flex-col gap-2"
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
          loading="lazy"
          // className="w-full h-auto block"
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
