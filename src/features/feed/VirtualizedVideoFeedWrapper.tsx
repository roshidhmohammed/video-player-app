import React, { useMemo, useRef, useState, useEffect } from "react";
import VideoFeed from "./VideoFeed";
import type { CategoryData } from "../../types";

interface Props {
  data: CategoryData[] | undefined;
}

/**
 * ⭐ Production window virtualization wrapper
 * Does NOT modify VideoFeed
 */
const VirtualizedVideoFeedWrapper: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Flatten videos for indexing
   */
  const flattened = useMemo(() => {
    if (!data) return [];

    return data.flatMap((section) =>
      section.contents.map((video) => ({
        section,
        video,
      })),
    );
  }, [data]);

  /**
   * Virtualization config
   */
  const ITEM_HEIGHT = 340;
  const OVERSCAN = 10;

  const [range, setRange] = useState({ start: 0, end: 20 });

  /**
   * Scroll listener
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
      const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT);

      setRange({
        start: Math.max(0, startIndex - OVERSCAN),
        end: startIndex + visibleCount + OVERSCAN,
      });
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Slice visible videos
   */
  const visibleFlat = flattened.slice(range.start, range.end);

  /**
   * Rebuild CategoryData shape (important)
   * So VideoFeed receives same structure
   */
  const virtualizedData: CategoryData[] = useMemo(() => {
    const map = new Map<string, CategoryData>();

    visibleFlat.forEach(({ section, video }) => {
      const key = section.category.name;

      if (!map.has(key)) {
        map.set(key, {
          ...section,
          contents: [],
        });
      }

      map.get(key)!.contents.push(video);
    });

    return Array.from(map.values());
  }, [visibleFlat]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-auto"
    >
      <VideoFeed data={virtualizedData} />
    </div>
  );
};

export default VirtualizedVideoFeedWrapper;
