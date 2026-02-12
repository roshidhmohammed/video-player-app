import { animate, useMotionValue, useTransform } from "framer-motion";
import { viewportHeight, viewportWidth } from "../useViewportSize";
import { useRef } from "react";

const usePlayerDrag = (minimize:any , video:any) => {
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
  const clampedY = useTransform(y, (latest) =>
    Math.min(Math.max(latest, 0), viewportHeight * 0.7),
  );

  const threshold = viewportHeight * 0.4;
  const handleDragEnd = (_: any, info: any) => {

    if (info.offset.y > threshold) {
      minimize(video);
    } else {
      x.stop();
      y.stop();

      animate(x, 0, { type: "spring", stiffness: 500, damping: 40 });
      animate(y, 0, { type: "spring", stiffness: 500, damping: 40 });
    }
  };
  

//   const threshold = viewportHeight * 0.4;

  return { x, y, scale, borderRadius, clampedX, clampedY, threshold, handleDragEnd, containerRef};
};

export default usePlayerDrag;
