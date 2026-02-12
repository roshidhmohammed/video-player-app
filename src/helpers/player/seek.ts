export const handleSeekMouseUp = (
  e: React.MouseEvent<HTMLInputElement>,
  playerRef: React.RefObject<any>,
  setSeeking: (value: boolean) => void
) => {
  setSeeking(false);

  if (!playerRef.current) return;

  const seekValue = parseFloat((e.target as HTMLInputElement).value);
  const videoElement = playerRef.current as HTMLVideoElement;

  if (videoElement.duration) {
    videoElement.currentTime = seekValue * videoElement.duration;
  }
};
