import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import { removeActiveVideo, updateIsMinimized } from "../state/player.slice";

export const usePlaybackControls = (
  playerRef: React.RefObject<YT.Player | null>,
  playing: boolean,
  setPlaying: (value: boolean) => void
) => {

    const selectedVideo = useSelector(
    (state: RootState) => state.player.activeVideo,
  );
  const dispatch = useDispatch()
    const navigate = useNavigate();

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

    setPlaying(!playing);
  }, [playing, playerRef, setPlaying]);

    const handleFullscreenMode = () => {
      dispatch(removeActiveVideo())
      dispatch(updateIsMinimized(false))
      navigate(`/${selectedVideo?.slug}`);
    };

  return { togglePlayPause , handleFullscreenMode };
};
