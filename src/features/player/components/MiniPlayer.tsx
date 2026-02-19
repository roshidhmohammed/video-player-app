import { useRef, useState } from "react";

// redux ans state stores
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

// custom-hooks
import { usePlayerControls } from "../hooks/usePlayerControls";
import useVideoPlayer from "../hooks/useVideoPlayer";
import { usePlaybackControls } from "../hooks/usePlaybackControls";
import { useMinimizePlayer } from "../hooks/useMinimizePlayer";

// icons
import { IoClose, IoPause, IoPlay } from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";

// animation library
import { motion } from "framer-motion";

const MiniPlayer = () => {
  const selectedVideo = useSelector(
    (state: RootState) => state.player.activeVideo,
  );
  const currentTime = useSelector(
    (state: RootState) => state.player.currentTime,
  );

  const [playing, setPlaying] = useState(true);
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<number | null>(null);

  const { setDuration, handleTimeUpdate, showControls } = usePlayerControls(
    true,
    selectedVideo?.slug,
  );

  useVideoPlayer(
    selectedVideo,
    playerRef,
    currentTime,
    setDuration,
    intervalRef,
    handleTimeUpdate,
    "mini-youtube-player",
  );
  const { togglePlayPause, handleFullscreenMode } = usePlaybackControls(
    playerRef,
    playing,
    setPlaying,
  );

  const { closePlayer } = useMinimizePlayer(0, 0);

  return (
    <div className="absolute right-8 bottom-5  h-60 md:h-full z-0 bg-black group border border-gray-800   shadow-xl  shadow-gray-800">
      <div
        id="mini-youtube-player"
        className="w-full h-full z-0  pointer-events-none"
      />

      {/* close player */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="opacity-0
    group-hover:opacity-100
    transition-opacity duration-500  absolute top-0 left-0 right-0 z-30 flex items-center justify-between  px-1 md:py-6 py-16 bg-gradient-to-b from-black/70 to-transparent"
      >
        <h2 className="text-white text-sm font-medium truncate">
          {selectedVideo?.title}
        </h2>

        <button
          onClick={closePlayer}
          className="text-white p-2 cursor-pointer rounded-full hover:bg-white/10 "
        >
          <IoClose size={22} />
        </button>
      </motion.div>

      {/* fullScreen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className=" opacity-0
    group-hover:opacity-100
    transition-opacity duration-500 absolute bottom-[30%] md:bottom-[35%] z-20 flex items-center justify-center min-w-full"
      >
        <button
          onClick={handleFullscreenMode}
          className="p-5 rounded-full cursor-pointer bg-black/50  text-white hover:scale-105 transition"
        >
          <MdFullscreen size={32} />
        </button>
      </motion.div>

      {/* Play/pause */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className=" opacity-0
    group-hover:opacity-100
    transition-opacity duration-500 absolute bottom-0 z-20 flex items-center justify-start pl-5 min-w-full"
      >
        <button
          onClick={togglePlayPause}
          className="p-5 rounded-full cursor-pointer bg-black/50 backdrop-blur-sm text-white hover:scale-105 transition"
        >
          {playing ? <IoPause size={32} /> : <IoPlay size={32} />}
        </button>
      </motion.div>
    </div>
  );
};

export default MiniPlayer;
