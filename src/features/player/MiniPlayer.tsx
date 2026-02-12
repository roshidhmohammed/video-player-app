import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { usePlayerControls } from "../../hooks/usePlayerControls";
import { Link, useNavigate } from "react-router-dom";
import { IoClose, IoPause, IoPlay } from "react-icons/io5";
import { motion } from "framer-motion";

import {
  removeActiveVideo,
  updateActiveVideo,
  updateIsMinimized,
} from "../../slices/videoPlayerSlice";

import { MdFullscreen } from "react-icons/md";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const loadYouTubeAPI = () =>
  new Promise<void>((resolve) => {
    if (window.YT && window.YT.Player) return resolve();

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => resolve();
  });

const MiniPlayer = () => {
  const selectedVideo = useSelector(
    (state: RootState) => state.player.activeVideo,
  );
  const currentTime = useSelector(
    (state: RootState) => state.player.currentTime,
  );

  const [playing, setPlaying] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<number | null>(null);

  const { setDuration, handleTimeUpdate, showControls } = usePlayerControls(
    true,
    selectedVideo?.slug,
  );

  useEffect(() => {
    if (!selectedVideo?.slug) return;

    let mounted = true;

    loadYouTubeAPI().then(() => {
      if (!mounted) return;

      playerRef.current = new window.YT.Player("mini-youtube-player", {
        videoId: selectedVideo.slug,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          fs: 0,
          controls: 0,
          modestbranding: 0,
          // iv_load_policy: 3,
          //  playsinline: 1,
          rel: 0,
          start: Math.floor(currentTime ?? 0),
        },
        events: {
          onReady: (event: any) => {
            const duration = event.target.getDuration();
            setDuration(duration);

            event.target.playVideo();

            intervalRef.current = window.setInterval(() => {
              const time = event.target.getCurrentTime();
              console.log(time);
              handleTimeUpdate(time, duration);
            }, 500);
          },
        },
      });
    });

    return () => {
      mounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      playerRef.current?.destroy();
      
    };
  }, [selectedVideo?.slug]);

  const closePlayer = () => {
    console.log("called");
    navigate("/");
    dispatch(updateIsMinimized());
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

    setPlaying(!playing);
  };

  const handleFullscreenMode = () => {
    dispatch(removeActiveVideo())
    dispatch(updateIsMinimized())
    navigate(`/${selectedVideo?.slug}`);
  };



  return (
    <div className="absolute inset-0 z-0 bg-black group border border-gray-800/90  shadow-xl shadow-gray-400">
      <div
        id="mini-youtube-player"
        className="w-full h-full z-0  pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="opacity-0
    group-hover:opacity-100
    transition-opacity duration-500  absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent"
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

      {/* ------------------  PLAY / PAUSE ------------------ */}
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
