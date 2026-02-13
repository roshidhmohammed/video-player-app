import VideoFeed from "../../../feed/components/VideoFeed";
import useSuggestionVideos from "../../hooks/useSuggestionVideos";

const SuggestionVideo = () => {
  const suggestionVideos = useSuggestionVideos();

  if (!suggestionVideos) return null;
  return (
    <div>
      <VideoFeed data={suggestionVideos} />
    </div>
  );
};

export default SuggestionVideo;
