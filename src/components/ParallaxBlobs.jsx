// src/components/ParallaxBlobs.jsx
import React, { useEffect, useRef } from "react";

export default function ParallaxBlobs() {
  // ---- TUNING KNOBS ----
  const MOUSE_WEIGHT = 0.53; // 0 = ignore mouse, 1 = strong mouse pull
  const AUTO = {
    // amplitudes in pixels for each blob's autonomous drift
    amp1: { x: 150, y: 90 },
    amp2: { x: 100, y: 80 },
    amp3: { x: 80,  y: 60 },
    amp4: { x: 70,  y: 50 },
    // speeds (smaller = slower). Keep each slightly different for organic feel
    sp1: { x: 0.00011, y: 0.00027 },
    sp2: { x: 0.00019, y: 0.00024 },
    sp3: { x: 0.00026, y: 0.00021 },
    sp4: { x: 0.00023, y: 0.00017 },
  };

  // Refs for 4 blobs (reduce to 2 if you only render two)
  const b1 = useRef(null), b2 = useRef(null), b3 = useRef(null), b4 = useRef(null);

  useEffect(() => {
    let raf = 0;
    let mouseDX = 0, mouseDY = 0; // distance from center (for optional mouse influence)

    // Base layout positions so blobs start nicely spread
    const baseFor = () => ({
      w: innerWidth, h: innerHeight,
      p1: { x: innerWidth*0.18, y: innerHeight*0.20 },
      p2: { x: innerWidth*0.62, y: innerHeight*0.65 },
      p3: { x: innerWidth*0.40, y: innerHeight*0.35 },
      p4: { x: innerWidth*0.72, y: innerHeight*0.28 },
    });
    let base = baseFor();

    const onResize = () => { base = baseFor(); };
    const onMove = (e) => {
      const cx = base.w/2, cy = base.h/2;
      mouseDX = e.clientX - cx;
      mouseDY = e.clientY - cy;
    };

    const lerp = (a,b,t)=>a+(b-a)*t;

    const tick = (tNow) => {
      // Autonomous offsets (smooth, periodic, independent)
      const a1x = Math.sin(tNow * AUTO.sp1.x) * AUTO.amp1.x;
      const a1y = Math.cos(tNow * AUTO.sp1.y) * AUTO.amp1.y;

      const a2x = Math.sin(tNow * AUTO.sp2.x + 1.3) * AUTO.amp2.x;
      const a2y = Math.cos(tNow * AUTO.sp2.y + 0.7) * AUTO.amp2.y;

      const a3x = Math.sin(tNow * AUTO.sp3.x + 2.1) * AUTO.amp3.x;
      const a3y = Math.cos(tNow * AUTO.sp3.y + 1.9) * AUTO.amp3.y;

      const a4x = Math.sin(tNow * AUTO.sp4.x + 0.6) * AUTO.amp4.x;
      const a4y = Math.cos(tNow * AUTO.sp4.y + 2.7) * AUTO.amp4.y;

      // Optional mouse pull (scaled and eased a bit)
      const m1x = mouseDX * 0.12 * MOUSE_WEIGHT;
      const m1y = mouseDY * 0.12 * MOUSE_WEIGHT;
      const m2x = -mouseDX * 0.09 * MOUSE_WEIGHT;
      const m2y = mouseDY  * 0.10 * MOUSE_WEIGHT;
      const m3x = mouseDX * 0.07 * MOUSE_WEIGHT;
      const m3y = -mouseDY * 0.06 * MOUSE_WEIGHT;
      const m4x = -mouseDX * 0.05 * MOUSE_WEIGHT;
      const m4y = -mouseDY * 0.04 * MOUSE_WEIGHT;

      // Apply smoothed positions
      if (b1.current) {
        const x = lerp(parseFloat(b1.current.dataset.x || 0), a1x + m1x, 0.1);
        const y = lerp(parseFloat(b1.current.dataset.y || 0), a1y + m1y, 0.1);
        b1.current.dataset.x = x; b1.current.dataset.y = y;
        b1.current.style.left = `${base.p1.x + x}px`;
        b1.current.style.top  = `${base.p1.y + y}px`;
      }
      if (b2.current) {
        const x = lerp(parseFloat(b2.current.dataset.x || 0), a2x + m2x, 0.1);
        const y = lerp(parseFloat(b2.current.dataset.y || 0), a2y + m2y, 0.1);
        b2.current.dataset.x = x; b2.current.dataset.y = y;
        b2.current.style.left = `${base.p2.x + x}px`;
        b2.current.style.top  = `${base.p2.y + y}px`;
      }
      if (b3.current) {
        const x = lerp(parseFloat(b3.current.dataset.x || 0), a3x + m3x, 0.1);
        const y = lerp(parseFloat(b3.current.dataset.y || 0), a3y + m3y, 0.1);
        b3.current.dataset.x = x; b3.current.dataset.y = y;
        b3.current.style.left = `${base.p3.x + x}px`;
        b3.current.style.top  = `${base.p3.y + y}px`;
      }
      if (b4.current) {
        const x = lerp(parseFloat(b4.current.dataset.x || 0), a4x + m4x, 0.1);
        const y = lerp(parseFloat(b4.current.dataset.y || 0), a4y + m4y, 0.1);
        b4.current.dataset.x = x; b4.current.dataset.y = y;
        b4.current.style.left = `${base.p4.x + x}px`;
        b4.current.style.top  = `${base.p4.y + y}px`;
      }

      raf = requestAnimationFrame(tick);
    };

    addEventListener("resize", onResize, { passive:true });
    addEventListener("mousemove", onMove, { passive:true });
    addEventListener("pointermove", onMove, { passive:true });

    raf = requestAnimationFrame(tick);
    return () => {
      removeEventListener("resize", onResize);
      removeEventListener("mousemove", onMove);
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Shared visual style (gooey look works best with similar hues)
  const baseStyle = {
    position: "absolute",
    left: 0, top: 0,
    borderRadius: "50%",
    filter: "blur(10px)",
    opacity: 0.7,
    willChange: "left, top",
  };

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ filter: "url(#goo)" }}  // uses <GooDefs /> in App.jsx
    >
      <div ref={b1} style={{ ...baseStyle, width: "34vw", height: "34vw", background: "#FFCCF8" }} />
      <div ref={b2} style={{ ...baseStyle, width: "28vw", height: "28vw", background: "#CCFFD3" }} />
      <div ref={b3} style={{ ...baseStyle, width: "20vw", height: "20vw", background: "#ECCCFF" }} />
      <div ref={b4} style={{ ...baseStyle, width: "16vw", height: "16vw", background: "#CCFFEC" }} />
    </div>
  );
}
