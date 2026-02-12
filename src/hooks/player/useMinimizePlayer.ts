import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateActiveVideo,
  updateCurrentTime,
  updateIsMinimized,
} from "../../slices/videoPlayerSlice";
import type { VideoContent } from "../../types";

export const useMinimizePlayer = (duration: number, played: number) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closePlayer = () => {
    dispatch(updateCurrentTime(0))
    navigate("/");
  };

  const minimize = useCallback(
    (video: VideoContent) => {
      dispatch(updateActiveVideo(video));
      dispatch(updateIsMinimized());
      dispatch(updateCurrentTime(duration * played));
      navigate("/");
    },
    [dispatch, duration, played, navigate],
  );

  return { minimize, closePlayer };
};
