import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";

interface SkipOverlayProps {
    skipAnimation: { direction: 'back' | 'forward'; timestamp: number } | null;
}

const SkipOverlay: React.FC<SkipOverlayProps> = ({ skipAnimation }) => {
    return (
        <AnimatePresence>
            {skipAnimation && (
                <motion.div
                    key={skipAnimation.timestamp}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 z-20 flex items-center pointer-events-none ${skipAnimation.direction === 'back' ? 'justify-start pl-8' : 'justify-end pr-8'
                        }`}
                >
                    <div className="flex flex-col items-center gap-2 bg-black/70 backdrop-blur-md rounded-2xl md:px-6 md:py-4 px-4 py-3 border border-white/20 shadow-2xl">
                        {skipAnimation.direction === 'back' ? (
                            <>
                                <IoPlayBack size={32} className="text-white md:size-12" />
                                <span className="text-white font-semibold md:text-lg text-base">-10s</span>
                            </>
                        ) : (
                            <>
                                <IoPlayForward size={32} className="text-white md:size-12" />
                                <span className="text-white font-semibold md:text-lg text-base">+10s</span>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SkipOverlay;
