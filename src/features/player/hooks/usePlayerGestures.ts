import { useEffect } from "react";

export const usePlayerGestures = (
  isDrawerOpen: boolean,
  setIsDrawerOpen: (open: boolean) => void,
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isDrawerOpen && e.deltaY > 50) {
        setIsDrawerOpen(true);
      } else if (isDrawerOpen && e.deltaY < -50) {
        const drawerContent = document.querySelector(".custom-scrollbar");
        if (drawerContent && drawerContent.scrollTop === 0) {
          setIsDrawerOpen(false);
        }
      }
    };

    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY;
      if (!isDrawerOpen && touchStart - touchEnd > 100) {
        setIsDrawerOpen(true);
      } else if (isDrawerOpen && touchEnd - touchStart > 100) {
        const drawerContent = document.querySelector(".custom-scrollbar");
        if (drawerContent && drawerContent.scrollTop === 0) {
          setIsDrawerOpen(false);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isDrawerOpen, setIsDrawerOpen, containerRef]);
};
