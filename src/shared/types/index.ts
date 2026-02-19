export interface VideoContent {
  title: string;
  mediaUrl: string;
  mediaType: "YOUTUBE";
  thumbnailUrl: string;
  slug: string;
  duration: string;
}

export interface CategoryData {
  category: CategoryInfo;
  contents: VideoContent[];
}

export interface CategoryInfo {
  slug: string;
  name: string;
  iconUrl: string;
}
