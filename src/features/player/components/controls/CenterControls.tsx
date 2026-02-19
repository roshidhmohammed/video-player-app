import React from "react";

// animations Library
import { motion } from "framer-motion";

// icons
import { IoPlay, IoPause, IoPlayBack, IoPlayForward } from "react-icons/io5";

// types
import type { CenterControlsProps } from "../../types/player.types";

const CenterControls: React.FC<CenterControlsProps> = ({
  playing,
  showControls,
  onPlayPause,
  onSkip,
}) => {
  return (
    <>
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {showControls && (
          <motion.button
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={onPlayPause}
            className="md:p-6 p-4 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all border border-white/20 shadow-2xl pointer-events-auto"
          >
            {playing ? (
              <IoPause size={40} className="md:size-14" />
            ) : (
              <IoPlay size={40} className="md:size-14" />
            )}
          </motion.button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute inset-0 z-10 flex items-center justify-between md:px-32 px-10 pointer-events-none"
      >
        <button
          onClick={(e) => onSkip(e, -10)}
          className="md:p-4 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all border border-white/20 shadow-lg pointer-events-auto"
        >
          <IoPlayBack size={24} className="md:size-8" />
        </button>

        <button
          onClick={(e) => onSkip(e, 10)}
          className="md:p-4 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all border border-white/20 shadow-lg pointer-events-auto"
        >
          <IoPlayForward size={24} className="md:size-8" />
        </button>
      </motion.div>
    </>
  );
};

export default CenterControls;
