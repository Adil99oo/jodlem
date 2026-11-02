import { useEffect, useRef, type PointerEvent } from "react";

/** Fade-and-rise on scroll: sets data-visible on the element once it enters view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.dataset.visible = "true"; io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** 3D hover tilt, only on devices that can hover and don't prefer reduced motion. */
export function tiltHandlers(max = 8) {
  const canTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  return {
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (!canTilt()) return;
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg)`;
    },
    onPointerLeave: (e: PointerEvent<HTMLElement>) => { e.currentTarget.style.transform = ""; },
  };
}
