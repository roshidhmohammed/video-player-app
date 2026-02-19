import { useRef, useState } from "react";

// redux and state stores
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

// custom hooks
import { useVideoData } from "../../../shared/hooks/useVideoData";
import useVideoPlayer from "./useVideoPlayer";
import { usePlayerControls } from "./usePlayerControls";
import { usePlaybackControls } from "./usePlaybackControls";
import { useMinimizePlayer } from "./useMinimizePlayer";

export const useVideoPlayerController = () => {
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<number | null>(null);

  const currentTime = useSelector(
    (state: RootState) => state.player.currentTime,
  );

  const { video, id } = useVideoData();

  const [playing, setPlaying] = useState(true);

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

  const { minimize } = useMinimizePlayer(duration, played);

  useVideoPlayer(
    video,
    playerRef,
    currentTime,
    setDuration,
    intervalRef,
    handleTimeUpdate,
    "mini-youtube-player",
  );

  return {
    video,
    playerRef,
    playing,
    setPlaying,
    played,
    setPlayed,
    duration,
    setDuration,
    setSeeking,
    showControls,
    togglePlayPause,
    minimize,
  };
};
