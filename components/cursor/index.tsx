"use client";

import React from "react";
import { isMobile } from "react-device-detect";

import { cursorStyles } from "./Cursor.styles";
import type { CursorProps } from "./Cursor.types";

function Cursor(_props: CursorProps) {
  const cursorElement = React.useRef<null | HTMLDivElement>(null);

  const onCursorMove = React.useCallback((e: MouseEvent) => {
    if (!cursorElement.current) return;

    cursorElement.current.style.background = cursorStyles.getBackgroundStyle(e.clientX, e.clientY);
  }, []);

  React.useEffect(() => {
    window.addEventListener("mousemove", onCursorMove);

    return () => {
      window.removeEventListener("mousemove", onCursorMove);
    };
  }, [onCursorMove]);

  return isMobile ? (
    <div />
  ) : (
    <div id="cursor" data-testid="cursor" ref={cursorElement} className={cursorStyles.container} />
  );
}

export default Cursor;
