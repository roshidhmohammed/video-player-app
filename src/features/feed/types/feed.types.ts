import type { CategoryData, VideoContent } from "../../../shared/types";

export interface VideoFeedProps {
  data: CategoryData[] | undefined;
  compact?: boolean;
}

export interface VideoCardProps {
  video: VideoContent;
  categoryName?: string;
}
