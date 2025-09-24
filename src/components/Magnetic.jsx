// src/components/Magnetic.jsx
import React, { useEffect, useRef } from "react";

/**
 * Wrap any element to give it a "magnetic" hover pull.
 * Props:
 *  - strength: how far it moves toward the cursor (px). Default 20–30 is subtle.
 *  - friction: how quickly it follows (0..1). Higher = snappier.
 */
export default function Magnetic({
  strength = 12,
  friction = 0.12,
  children,
  className,
  style,
}) {
  const ref = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const active = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      active.current = true;
      el.style.willChange = "transform";
    };

    const onMove = (e) => {
      if (!active.current) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // clamp to strength radius
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, strength / dist);
      target.current.x = dx * k;
      target.current.y = dy * k;
    };

    const onLeave = () => {
      active.current = false;
      target.current.x = 0;
      target.current.y = 0;
    };

    const tick = () => {
      // ease current toward target
      current.current.x += (target.current.x - current.current.x) * friction;
      current.current.y += (target.current.y - current.current.y) * friction;
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
      el.style.willChange = "";
    };
  }, [strength, friction]);

  // Keep layout/styling from your child; we only apply the transform on this wrapper
  return (
    <span ref={ref} className={className} style={{ display: "inline-block", ...style }}>
      {children}
    </span>
  );
}
