"use client";

import React from "react";

import { isMobile } from "react-device-detect";

function Cursor() {
  const cursorElement = React.useRef<null | HTMLDivElement>(null);

  const onCursorMove = React.useCallback((e: MouseEvent) => {
    if (!cursorElement.current) return;

    cursorElement.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15) 0%, transparent 80%)`;
  }, []);

  React.useEffect(() => {
    window.addEventListener("mousemove", onCursorMove);

    return () => {
      window.removeEventListener("mousemove", onCursorMove);
    };
  }, [onCursorMove]);

  return isMobile ? null : (
    <div
      id="cursor"
      ref={cursorElement}
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 tablet:absolute"
    />
  );
}

export default Cursor;
