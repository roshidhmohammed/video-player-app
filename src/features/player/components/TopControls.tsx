import React from "react";
import { motion } from "framer-motion";
import { IoArrowBack, IoClose } from "react-icons/io5";

interface TopControlsProps {
    showControls: boolean;
    title: string;
    onClose: () => void;
}

const TopControls: React.FC<TopControlsProps> = ({ showControls, title, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
                opacity: showControls ? 1 : 0,
                y: showControls ? 0 : -20,
            }}
            className="absolute top-0 left-0 right-0 z-20 md:p-6 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start pointer-events-none"
        >
            <div className="flex items-center gap-3 pointer-events-auto">
                <button
                    onClick={onClose}
                    className="md:p-2 p-1.5 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10"
                >
                    <IoArrowBack size={18} className="md:size-5" />
                </button>
                <h2 className="text-white font-medium md:text-lg text-base text-shadow-sm line-clamp-1">{title}</h2>
            </div>

            <button
                onClick={onClose}
                className="md:p-2 p-1.5 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10 pointer-events-auto"
            >
                <IoClose size={18} className="md:size-5" />
            </button>
        </motion.div>
    );
};

export default TopControls;
