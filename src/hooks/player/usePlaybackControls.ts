import { useCallback } from "react";

export const usePlaybackControls = (
  playerRef: React.RefObject<any>,
  playing: boolean,
  setPlaying: (value: boolean) => void
) => {
  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

    setPlaying(!playing);
  }, [playing, playerRef, setPlaying]);

  return { togglePlayPause };
};
