import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoExpand } from "react-icons/io5";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    mediaUrl: string;
  };
};

const VideoModal = ({ isOpen, onClose, video }: Props) => {
  const toggleFullScreen = () => {
    const iframe = document.getElementById("yt-modal-player");
    if (!document.fullscreenElement && iframe) {
      iframe.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
        >
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-2 bg-black/60 rounded-full text-white hover:bg-white/20"
            >
              <IoClose size={22} />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullScreen}
              className="absolute top-3 left-3 z-20 p-2 bg-black/60 rounded-full text-white hover:bg-white/20"
            >
              <IoExpand size={20} />
            </button>

            {/* YouTube iframe */}
            <iframe
              id="yt-modal-player"
              src={`${video.mediaUrl}?autoplay=1&rel=0`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
