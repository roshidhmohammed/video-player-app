import { useCallback } from "react";

// redux
import { useDispatch } from "react-redux";
import {
  updateActiveVideo,
  updateCurrentTime,
  updateIsMinimized,
} from "../state/player.slice";

// react navigation library
import { useNavigate } from "react-router-dom";

// types
import type { VideoContent } from "../../../shared/types";

export const useMinimizePlayer = (duration: number, played: number) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closePlayer = () => {
    dispatch(updateIsMinimized(false));
    dispatch(updateCurrentTime(0));
    navigate("/");
  };

  const minimize = useCallback(
    (video: VideoContent) => {
      dispatch(updateActiveVideo(video));
      dispatch(updateIsMinimized(true));
      dispatch(updateCurrentTime(duration * played));
      navigate("/");
    },
    [dispatch, duration, played, navigate],
  );

  return { minimize, closePlayer };
};
