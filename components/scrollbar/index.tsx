"use client";

import React from "react";

import { scrollbarStyles } from "./Scrollbar.styles";
import type { ScrollbarProps } from "./Scrollbar.types";

function Scrollbar({ children }: ScrollbarProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const scrollTrackRef = React.useRef<HTMLButtonElement>(null);
  const scrollThumbRef = React.useRef<HTMLButtonElement>(null);
  const observer = React.useRef<ResizeObserver>(null);

  const [hideScroll, setHideScroll] = React.useState(false);
  const [thumbHeight, setThumbHeight] = React.useState(20);
  const [scrollStartPosition, setScrollStartPosition] = React.useState<null | number>(null);
  const [initialScrollTop, setInitialScrollTop] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleResize = React.useCallback((ref: HTMLDivElement, trackSize: number) => {
    const { clientHeight, scrollHeight } = ref;

    if (clientHeight <= scrollHeight) {
      // return setHideScroll(true);
    }
    setHideScroll(false);
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }, []);

  const handleThumbMousedown = React.useCallback((e: MouseEvent | React.MouseEvent) => {
    setScrollStartPosition(e.clientY);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = React.useCallback(
    (_e: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging],
  );

  const handleThumbMousemove = React.useCallback(
    (e: MouseEvent) => {
      if (isDragging && contentRef.current && scrollStartPosition !== null) {
        e.preventDefault();

        const { scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight } =
          contentRef.current;

        const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
        const newScrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight,
        );

        contentRef.current.scrollTop = newScrollTop;
      }
    },
    [initialScrollTop, isDragging, scrollStartPosition, thumbHeight],
  );

  const handleThumbPosition = React.useCallback(() => {
    if (!(contentRef.current && scrollTrackRef.current && scrollThumbRef.current)) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop + 8}px`;
  }, [thumbHeight]);

  const handleTrackClick = React.useCallback(
    (e: React.MouseEvent) => {
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientY } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [thumbHeight],
  );

  React.useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;

      if (!observer.current) {
        observer.current = new ResizeObserver(() => {
          handleResize(ref, trackSize);
        });
        handleResize(ref, trackSize);
        observer.current.observe(ref);
      }
      ref.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, [handleResize, handleThumbPosition]);

  React.useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    document.addEventListener("mouseleave", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
      document.removeEventListener("mouseleave", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  const trackAndThumbDragging = isDragging ? { width: "8px", opacity: 1 } : {};

  return (
    <div id="scrollbar" className={`custom-scrollbar__container ${scrollbarStyles.container}`}>
      <div className={`custom-scrollbar__content ${scrollbarStyles.content}`} ref={contentRef}>
        {children}
      </div>
      {!hideScroll && (
        <div className={`custom-scrollbar__scrollbar ${scrollbarStyles.scrollbar}`}>
          <div
            className={`custom-scrollbar__track-and-thumb ${scrollbarStyles.trackAndThumb}`}
            style={{ ...trackAndThumbDragging }}
          >
            <button
              type="button"
              className={`custom-scrollbar__track ${scrollbarStyles.track}`}
              ref={scrollTrackRef}
              onClick={handleTrackClick}
              aria-label="Scroll track"
              style={{ cursor: isDragging ? "grabbing" : "pointer" }}
            />
            <button
              type="button"
              className={`custom-scrollbar__thumb ${scrollbarStyles.thumb}`}
              ref={scrollThumbRef}
              onMouseDown={handleThumbMousedown}
              style={{
                height: `${thumbHeight}px`,
                cursor: isDragging ? "grabbing" : "grab",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Scrollbar;
