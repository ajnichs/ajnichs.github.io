// src/components/GooDefs.jsx
import React from "react";

export default function GooDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="goo">
          {/* blur the shapes */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          {/* threshold so overlapped areas fuse */}
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -14"
            result="goo"
          />
          {/* clean up edges */}
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}
