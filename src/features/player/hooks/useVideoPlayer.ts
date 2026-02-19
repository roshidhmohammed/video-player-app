import { useEffect, type RefObject } from "react";
import type { VideoContent } from "../../../shared/types";
import { YOUTUBE_IFRAME_API } from "../../../shared/constants/Data";

const loadYouTubeAPI = () =>
  new Promise<void>((resolve) => {
    if (window.YT && window.YT.Player) return resolve();

    const tag = document.createElement("script");
    tag.src = YOUTUBE_IFRAME_API;
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => resolve();
  });

const useVideoPlayer = (
  selectedVideo: VideoContent | undefined | null,
  playerRef: RefObject<YT.Player | null>,
  currentTime: number | null,
  setDuration: (duration: number) => void,
  intervalRef: RefObject<number | null>,
  handleTimeUpdate: (currentTime: number, duration: number) => void,
  playerElementId: string,
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
          onReady: (event: YT.PlayerEvent) => {
            const duration = event.target.getDuration();
            setDuration(duration);

            event.target.playVideo();

            intervalRef.current = window.setInterval(() => {
              const time = event.target.getCurrentTime();
              handleTimeUpdate(time, duration);
            }, 500);
          },

          // video end event
          onStateChange: (event: YT.PlayerEvent) => {
            const { PlayerState } = window.YT;

            if (
              event.data === PlayerState.ENDED &&
              playerElementId === "full-screen-youtube-player"
            ) {
              console.log("ended");

              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
            }
          },
        },
      });
    });

    return () => {
      mounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      playerRef.current?.destroy();
    };
  }, [selectedVideo?.slug]);
};

export default useVideoPlayer;
