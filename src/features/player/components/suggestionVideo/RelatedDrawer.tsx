import React from "react";

// animation library
import { motion } from "framer-motion";

// icons
import { IoClose } from "react-icons/io5";

// components
import SuggestionVideo from "./SuggestionVideo";

// types
import type { RelatedDrawerProps } from "../../types/player.types";

const RelatedDrawer: React.FC<RelatedDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.y > 100) {
          onClose();
        }
      }}
      className="absolute inset-0 z-30 bg-black/90 backdrop-blur-xl flex flex-col pt-4"
    >
      {/* Drawer Handle */}
      <div
        className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing"
        onClick={onClose}
      />

      <div className="px-6 flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-xl">Related Videos</h3>
        <button
          onClick={onClose}
          className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all"
        >
          <IoClose size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-12 custom-scrollbar">
        <SuggestionVideo />
      </div>
    </motion.div>
  );
};

export default RelatedDrawer;
