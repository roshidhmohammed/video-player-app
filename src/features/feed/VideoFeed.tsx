import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import type { CategoryData } from "../../types";
import { motion } from "framer-motion";

interface VideoFeedProps {
  data: CategoryData[] | undefined;
  compact?: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
//   hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const VideoFeed: React.FC<VideoFeedProps> = ({ data }) => {
    const [videoData, setVideoData] = React.useState<CategoryData[] | undefined>(data);
  useEffect(() => {
    setVideoData(data);
  }, [data]);

//   console.log(videoData)

  if (!videoData) return null;
  return (
    <div className= "pb-24 p-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10"
            
      >
        {videoData.flatMap((section) =>
          section.contents.map((video) => (
            <motion.div key={video.slug} variants={item}>

              <VideoCard video={video} categoryName={section.category.name} />
            </motion.div>
          )),
        )}
      </motion.div>
    </div>
  );
};

export default VideoFeed;
