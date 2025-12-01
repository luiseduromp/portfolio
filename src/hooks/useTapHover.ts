import React, { useEffect } from "react";

export function useTapHover(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !("ontouchstart" in window || navigator.maxTouchPoints > 0))
      return;
    //console.log('TAP')

    let tapped = false;
    let touchMoved = false;

    const onTouchStart = () => (touchMoved = false);
    const onTouchMove = () => {
      touchMoved = true;
      delete el.dataset.hover;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchMoved) {
        tapped = false;
        delete el.dataset.hover;
        return;
      }

      if (!tapped) {
        el.dataset.hover = "";
        tapped = true;
        e.preventDefault();
      } else {
        tapped = false;
      }
      e.stopPropagation();
    };

    const onOutsideTouch = (e: TouchEvent) => {
      if (!el.contains(e.target as Node)) {
        delete el.dataset.hover;
        tapped = false;
      }
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", onTouchEnd);
    document.addEventListener("touchstart", onOutsideTouch);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchstart", onOutsideTouch);
    };
  }, [ref]);
}
