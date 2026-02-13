import React from "react";
import { motion } from "framer-motion";
import { IoPause, IoPlay, IoChevronUp } from "react-icons/io5";
import { formatTime } from "../../../../helpers/formatTime";
import type { BottomControlsProps } from "../../types/player.types";

const BottomControls: React.FC<BottomControlsProps> = ({
  showControls,
  isDrawerOpen,
  playing,
  played,
  duration,
  onPlayPause,
  onSeekMouseDown,
  onSeekChange,
  onSeekMouseUp,
  onOpenDrawer,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: showControls && !isDrawerOpen ? 1 : 0,
        y: showControls && !isDrawerOpen ? 0 : 20,
      }}
      className="absolute bottom-0 left-0 right-0 z-20 md:p-6 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2"
    >
      {/* Seek Bar */}
      <div className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative group/seek">
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full pointer-events-none"
          style={{ width: `${played * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full shadow-md scale-0 group-hover/seek:scale-100 transition-transform pointer-events-none"
          style={{ left: `${played * 100}%` }}
        />
      </div>

      {/* Control Buttons & Time */}
      <div className="flex items-center justify-between md:mt-2 mt-1">
        <div className="flex items-center gap-3">
          <button
            onClick={onPlayPause}
            className="text-white hover:text-blue-400 transition-colors"
          >
            {playing ? (
              <IoPause size={22} className="md:size-7" />
            ) : (
              <IoPlay size={22} className="md:size-7" />
            )}
          </button>

          <div className="text-white/80 md:text-sm text-xs font-medium ml-1">
            {formatTime(played * duration)} / {formatTime(duration)}
          </div>
        </div>

        {/* Reveal Hint */}
        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <IoChevronUp size={20} />
          <span className="text-[10px] uppercase tracking-widest font-bold">
            Related
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default BottomControls;
