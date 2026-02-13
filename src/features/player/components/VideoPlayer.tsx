import React, { useState, useRef, useEffect, startTransition } from "react";
// import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoData } from "../../../shared/hooks/useVideoData";
import { usePlayerControls } from "../hooks/usePlayerControls";
import { usePlayerGestures } from "../hooks/usePlayerGestures";
import TopControls from "./controls/TopControls";
import CenterControls from "./controls/CenterControls";
import BottomControls from "./controls/BottomControls";
import RelatedDrawer from "./suggestionVideo/RelatedDrawer";
import SkipOverlay from "./controls/SkipOverlay";

import useVideoPlayer from "../hooks/useVideoPlayer";
import { handleSkipHelper } from "../services/handleSkip";

import { usePlaybackControls } from "../hooks/usePlaybackControls";
import { useMinimizePlayer } from "../hooks/useMinimizePlayer";
import { handleSeekMouseUp } from "../../../helpers/player/seek";
import usePlayerDrag from "../hooks/usePlayerDrag";
import useModalNavigation from "../../../hooks/useModalNavigation";
import useModalBehavior from "../../../hooks/ui/useModalBehavior";
import usePlayerStore from "../hooks/usePlayerStore";

const VideoPlayer: React.FC = () => {
  

  const playerRef = useRef<YT.Player | null>(null);

  const { closeModal, isOpen } = useModalNavigation();


  const {currentTime} = usePlayerStore()

  const { video, id } = useVideoData();
  const selectedVideo = video;

  // const [isOpen, setIsOpen] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState<{
    direction: "back" | "forward";
    timestamp: number;
  } | null>(null);

  const intervalRef = useRef<number | null>(null);

  const {
    played,
    setPlayed,
    duration,
    setDuration,
    setSeeking,
    showControls,
    handleTimeUpdate,
  } = usePlayerControls(playing, id);

  const { togglePlayPause } = usePlaybackControls(
    playerRef,
    playing,
    setPlaying,
  );

  const { minimize, closePlayer } = useMinimizePlayer(duration, played);

    const {
    // x,
    // y,
    scale,
    borderRadius,
    clampedX,
    clampedY,
    containerRef,
    // threshold,
    handleDragEnd
  } = usePlayerDrag(minimize, video);

  const handleSkipClick = (e: React.MouseEvent, seconds: number) => {
    handleSkipHelper({ event: e, seconds, playerRef, setSkipAnimation });
  };

  const onSeekMouseUpHandler = (e: React.MouseEvent<HTMLInputElement>) =>
    handleSeekMouseUp(e, playerRef, setSeeking);

  usePlayerGestures(isDrawerOpen, setIsDrawerOpen, containerRef);

  // Reset state on video change
  // useEffect(() => {
  //   setIsDrawerOpen(false);
  //   setPlaying(true);
  // }, [id]);

  useEffect(() => {
  startTransition(() => {
    setIsDrawerOpen(false);
    setPlaying(true);
  });
}, [id]);

  // const closeModal = () => {
  //   setIsOpen(false);
  //   setTimeout(() => navigate(-1), 200);
  // };

  useVideoPlayer(
    selectedVideo,
    playerRef,
    currentTime,
    setDuration,
    intervalRef,
    handleTimeUpdate,
    "full-screen-youtube-player",
  );

  useModalBehavior( closeModal);

  if (!video) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Video not found
      </div>
    );
  }

  // const handlePlayPause = () => setPlaying(!playing);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 w-full bg-[#1a1818] backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            ref={containerRef}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: window.innerHeight,
            }}
            dragMomentum={false}
            dragElastic={0.1}
            dragTransition={{
              bounceStiffness: 600,
              bounceDamping: 20,
            }}
            style={{
              x: clampedX,
              y: clampedY,
              scale,
              borderRadius,
            }}
            // onDragEnd={(_, info) => {
            //   // const threshold = viewportHeight * 0.4; // 40% drag required

            //   if (info.offset.y > threshold) {
            //     minimize(video);
            //   } else {
            //     y.stop(); // stop drag physics
            //     x.stop();

            //     animate(y, 0, {
            //       type: "spring",
            //       stiffness: 500,
            //       damping: 40,
            //     });

            //     animate(x, 0, {
            //       type: "spring",
            //       stiffness: 500,
            //       damping: 40,
            //     });
            //   }
            // }}

            onDragEnd={handleDragEnd}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className="fixed top-0 left-0 w-full h-[100dvh] bg-black z-50 overflow-hidden shadow-2xl"
          >
            <div
              className="absolute inset-0"
              onClick={closeModal}
              style={{ pointerEvents: isDrawerOpen ? "none" : "auto" }}
            />

            <motion.div
              // ref={containerRef}
              layoutId={`video-container-${video.slug}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.3,
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="absolute w-full right-0 left-0 h-[100dvh] bg-black overflow-hidden shadow-2xl z-10 ring-1 ring-white/30 group"
            >
              <div
                className="absolute inset-0 z-0 bg-black pointer-events-none"
                onClick={togglePlayPause}
              >
                <div
                  id="full-screen-youtube-player"
                  className="w-full h-full z-0  pointer-events-none"
                />
              </div>
            </motion.div>

            <TopControls
              showControls={showControls}
              title={video.title}
              onClose={closePlayer}
            />

            <CenterControls
              playing={playing}
              showControls={showControls}
              onPlayPause={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              onSkip={handleSkipClick}
            />

            <SkipOverlay skipAnimation={skipAnimation} />

            <BottomControls
              showControls={showControls}
              isDrawerOpen={isDrawerOpen}
              playing={playing}
              played={played}
              duration={duration}
              onPlayPause={togglePlayPause}
              onSeekMouseDown={() => setSeeking(true)}
              onSeekChange={(e) => setPlayed(parseFloat(e.target.value))}
              onSeekMouseUp={onSeekMouseUpHandler}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />

            <RelatedDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayer;
