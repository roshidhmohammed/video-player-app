import type { RefObject } from "react";

type SkipDirection = "back" | "forward";

interface HandleSkipParams {
  event: React.MouseEvent;
  seconds: number;
  playerRef: RefObject<YT.Player | null>;
  setSkipAnimation: React.Dispatch<
    React.SetStateAction<{
      direction: SkipDirection;
      timestamp: number;
    } | null>
  >;
}

export const handleSkipHelper = ({
  event,
  seconds,
  playerRef,
  setSkipAnimation,
}: HandleSkipParams): void => {
  event.stopPropagation();

  const player = playerRef.current;
  if (!player) return;

  const currentTime = player.getCurrentTime();
  player.seekTo(currentTime + seconds, true);

  setSkipAnimation({
    direction: seconds < 0 ? "back" : "forward",
    timestamp: Date.now(),
  });

  setTimeout(() => setSkipAnimation(null), 600);
};
