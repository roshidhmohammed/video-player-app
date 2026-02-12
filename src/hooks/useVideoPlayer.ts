import  { useEffect } from "react";
import type { Video } from "../types";
// import { Ref } from "react";
// type UseVideoPlayerParams = {
//   selectedVideo: Video | null;
//   playerRef: MutableRefObject<YT.Player | null>;
//   currentTime: number | null;
//   setDuration: (duration: number) => void;
//   intervalRef: MutableRefObject<number | null>;
//   handleTimeUpdate: (currentTime: number, duration: number) => void;
//   playerElementId: string;
// };


const loadYouTubeAPI = () =>
  new Promise<void>((resolve) => {
    if (window.YT && window.YT.Player) return resolve();

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => resolve();
  });

const useVideoPlayer = (
  selectedVideo,
  playerRef,
  currentTime,
  setDuration,
  intervalRef,
  handleTimeUpdate,
  playerElementId
) => {
  useEffect(() => {
    if (!selectedVideo?.slug) return;

    let mounted = true;

    loadYouTubeAPI().then(() => {
      if (!mounted) return;

      playerRef.current = new window.YT.Player(playerElementId, {
        videoId: selectedVideo.slug,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          fs: 0,
          controls: 0,
          modestbranding: 0,
          // iv_load_policy: 3,
          //  playsinline: 1,
          rel: 0,
          start: Math.floor(currentTime ?? 0),
        },
        events: {
          onReady: (event: any) => {
            const duration = event.target.getDuration();
            setDuration(duration);

            event.target.playVideo();

            intervalRef.current = window.setInterval(() => {
              const time = event.target.getCurrentTime();
              handleTimeUpdate(time, duration);
            }, 500);
          },
        },
      });
    });

    return () => {
      mounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      playerRef.current?.destroy();
      // dispatch(updateIsMinimized());
      // dispatch(removeActiveVideo())
    };
  }, [selectedVideo?.slug]);

  // return;
};

export default useVideoPlayer;
