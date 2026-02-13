export {};

declare global {
  namespace YT {
    interface Player {
      playVideo(): void;
      pauseVideo(): void;
      stopVideo(): void;
      getPlayerState(): number;
      seekTo(seconds: number, allowSeekAhead?: boolean): void;
      getDuration(): number;
      getCurrentTime(): number;
      destroy(): void;
    }

    interface PlayerEvent {
      target: Player;
    }
  }

  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}
