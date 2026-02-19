import { useRef } from "react";

// animation library
import {
  animate,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";

// hooks
import { viewportHeight, viewportWidth } from "./useViewportSize";

// types
import type { VideoContent } from "../../../shared/types";

const usePlayerDrag = (
  minimize: (video: VideoContent) => void,
  video: VideoContent | undefined,
) => {
  const containerRef = useRef<HTMLDivElement>(null);


  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // shrink while dragging
  const scale = useTransform(y, [0, viewportHeight * 0.6], [1, 0.45]);
  const borderRadius = useTransform(y, [0, viewportHeight * 0.6], [0, 16]);

  // clamp values inside screen
  const clampedX = useTransform(x, (latest) => {
    const elementWidth = viewportWidth;
    const maxX = viewportWidth - elementWidth;

    return Math.min(Math.max(latest, 0), maxX);
  });

  const maxDrag = viewportHeight * 1; // 👈 LIMIT HERE
  const clampedY = useTransform(y, (latest) =>
    Math.min(Math.max(latest, 0), maxDrag),
  );
  const threshold = viewportHeight * 0.4;
  const handleDrag = () => {
    const currentY = y.get();

    //  Hard clamp (prevents overflow completely)
    if (currentY < 0) y.set(0);
    if (currentY > maxDrag) y.set(maxDrag);
  };
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.y > threshold && video) {
      minimize(video);
    } else {
      x.stop();
      y.stop();

      animate(x, 0, { type: "spring", stiffness: 500, damping: 40 });
      animate(y, 0, { type: "spring", stiffness: 500, damping: 40 });
    }
  };

  return {
    x,
    y,
    scale,
    borderRadius,
    threshold,
    handleDragEnd,
    containerRef,
    handleDrag,
    clampedX,
    clampedY,
  };
};

export default usePlayerDrag;
