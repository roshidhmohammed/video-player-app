import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentTime } from "../slices/videoPlayerSlice";

export const usePlayerControls = (playing: boolean, id: string | undefined) => {
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const dispatch = useDispatch();
  const controlsTimeoutRef = useRef<number | null>(null);

  // Reset state on video change
  useEffect(() => {
    setPlayed(0);
  }, [id]);


  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (playing) {
        controlsTimeoutRef.current = window.setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const handleMouseMove = () => resetControlsTimeout();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseMove);

    resetControlsTimeout();

    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseMove);
    };
  }, [playing]);

  const handleTimeUpdate = (currentTime: number, totalDuration: number) => {
    if (!seeking) {
      setPlayed(currentTime / totalDuration);
      dispatch(updateCurrentTime(currentTime));
    }
  };

  return {
    played,
    setPlayed,
    duration,
    setDuration,
    seeking,
    setSeeking,
    showControls,
    setShowControls,
    handleTimeUpdate,
  };
};
