import { useEffect, useState } from "react";

export default function TypingLine({
  text,
  speed = 80,
  pause = 1200,
  loop = false,
  start = true,       // NEW: typing won’t start until this is true
  className = "",
  showCursor = true,
}) {
  const [shown, setShown] = useState("");
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!start) return; // 🚫 don’t run until start=true

    let i = 0;
    let forward = true;
    let timer;
    let cursorTimer = setInterval(() => setBlink((b) => !b), 500);

    const type = () => {
      if (forward) {
        if (i <= text.length) {
          setShown(text.slice(0, i++));
          timer = setTimeout(type, speed);
        } else if (loop) {
          forward = false;
          timer = setTimeout(type, pause);
        }
      } else {
        if (i >= 0) {
          setShown(text.slice(0, i--));
          timer = setTimeout(type, speed / 2);
        } else {
          forward = true;
          timer = setTimeout(type, speed);
        }
      }
    };

    type();
    return () => {
      clearTimeout(timer);
      clearInterval(cursorTimer);
    };
  }, [text, speed, pause, loop, start]);

  return (
    <span className={className}>
      {shown}
      {showCursor && (
        <span
          className={`drop-shadow-[0_0_2px_#073811] ml-1 inline-block h-[1.1em] w-[0.6ch] align-[-0.15em] bg-current ${
            blink ? "opacity-90" : "opacity-10"
          }`}
        />
      )}
    </span>
  );
}
