export type SkipDirection = "back" | "forward";

export interface SkipAnimation {
  direction: SkipDirection;
  timestamp: number;
}

export interface BottomControlsProps {
  showControls: boolean;
  isDrawerOpen: boolean;
  playing: boolean;
  played: number;
  duration: number;
  onPlayPause: () => void;
  onSeekMouseDown: () => void;
  onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
  onOpenDrawer: () => void;
}

export interface CenterControlsProps {
  playing: boolean;
  showControls: boolean;
  onPlayPause: (e: React.MouseEvent) => void;
  onSkip: (e: React.MouseEvent, seconds: number) => void;
}

export interface RelatedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SkipOverlayProps {
  skipAnimation: { direction: "back" | "forward"; timestamp: number } | null;
}

export interface TopControlsProps {
  showControls: boolean;
  title: string;
  onClose: () => void;
}
