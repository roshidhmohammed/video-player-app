export interface VideoContent {
  title: string;
  mediaUrl: string;
  mediaType: "YOUTUBE";
  thumbnailUrl: string;
  slug: string;
  duration: string;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  iconUrl: string;
}

export interface CategoryData {
  category: CategoryInfo;
  contents: VideoContent[];
}

export type SkipDirection = "back" | "forward";

export interface SkipAnimation {
  direction: SkipDirection;
  timestamp: number;
}

export interface Video {
  slug: string;
  title?: string;
  mediaUrl?: string;
}

