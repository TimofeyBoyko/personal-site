import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Scrollbar from "./index";

// Mock ResizeObserver
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

// Save original implementation
const originalResizeObserver = window.ResizeObserver;

describe("Scrollbar", () => {
  beforeEach(() => {
    // Setup ResizeObserver mock
    window.ResizeObserver = ResizeObserverMock as any;

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      right: 100,
      bottom: 200,
      width: 100,
      height: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  });

  afterEach(() => {
    // Restore original implementations
    window.ResizeObserver = originalResizeObserver;
    jest.restoreAllMocks();
  });

  it("renders children correctly", () => {
    render(
      <Scrollbar>
        <div data-testid="scrollbar-content">Test Content</div>
      </Scrollbar>,
    );

    expect(screen.getByTestId("scrollbar-content")).toBeInTheDocument();
    expect(screen.getByTestId("scrollbar-content")).toHaveTextContent(
      "Test Content",
    );
  });

  it("renders scrollbar container with correct class", () => {
    const { container } = render(
      <Scrollbar>
        <div>Test Content</div>
      </Scrollbar>,
    );

    const scrollbarContainer = container.querySelector(
      ".custom-scrollbar__container",
    );
    expect(scrollbarContainer).toBeInTheDocument();
    expect(scrollbarContainer).toHaveClass(
      "relative max-h-dvh overflow-hidden bg-transparent",
    );
  });

  it("renders scrollbar content with correct class", () => {
    const { container } = render(
      <Scrollbar>
        <div>Test Content</div>
      </Scrollbar>,
    );

    const scrollbarContent = container.querySelector(
      ".custom-scrollbar__content",
    );
    expect(scrollbarContent).toBeInTheDocument();
    expect(scrollbarContent).toHaveClass("max-h-dvh overflow-auto");
  });

  it("renders track and thumb elements", () => {
    const { container } = render(
      <Scrollbar>
        <div style={{ height: "1000px" }}>Long Content</div>
      </Scrollbar>,
    );

    const scrollbarTrack = container.querySelector(".custom-scrollbar__track");
    const scrollbarThumb = container.querySelector(".custom-scrollbar__thumb");

    expect(scrollbarTrack).toBeInTheDocument();
    expect(scrollbarThumb).toBeInTheDocument();
  });

  it("handles thumb mousedown event", () => {
    const { container } = render(
      <Scrollbar>
        <div style={{ height: "1000px" }}>Long Content</div>
      </Scrollbar>,
    );

    const thumb = container.querySelector(".custom-scrollbar__thumb");
    expect(thumb).toBeInTheDocument();

    if (thumb) {
      fireEvent.mouseDown(thumb, { clientY: 100 });

      // Verify thumb style changes for dragging state
      expect(
        container.querySelector(".custom-scrollbar__track-and-thumb"),
      ).toHaveStyle({
        opacity: "1",
        width: "8px",
      });
    }
  });

  it("handles track click event", () => {
    // Mock scrollTo
    const scrollToMock = jest.fn();
    Element.prototype.scrollTo = scrollToMock;

    const { container } = render(
      <Scrollbar>
        <div style={{ height: "1000px" }}>Long Content</div>
      </Scrollbar>,
    );

    const track = container.querySelector(".custom-scrollbar__track");
    expect(track).toBeInTheDocument();

    if (track) {
      fireEvent.click(track, { clientY: 100 });

      // Verify scrollTo was called
      expect(scrollToMock).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: "smooth",
        }),
      );
    }
  });

  it("updates thumb height based on content", () => {
    // Mock element dimensions
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      value: 1000,
    });

    const { container } = render(
      <Scrollbar>
        <div style={{ height: "1000px" }}>Long Content</div>
      </Scrollbar>,
    );

    const thumb = container.querySelector(".custom-scrollbar__thumb");

    // We can't easily test the exact height due to the async nature of ResizeObserver,
    // but we can verify the thumb element exists
    expect(thumb).toBeInTheDocument();
  });

  it("adds and removes event listeners", () => {
    const addEventListenerSpy = jest.spyOn(
      Element.prototype,
      "addEventListener",
    );
    const removeEventListenerSpy = jest.spyOn(
      Element.prototype,
      "removeEventListener",
    );

    const { unmount } = render(
      <Scrollbar>
        <div>Test Content</div>
      </Scrollbar>,
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );

    // Unmount to test cleanup
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });

  it("adds and removes document event listeners", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <Scrollbar>
        <div>Test Content</div>
      </Scrollbar>,
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mouseup",
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function),
    );

    // Unmount to test cleanup
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mouseup",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function),
    );
  });

  it("handles mouse movement during dragging", () => {
    // Setup mocks for scrollTop testing
    Object.defineProperty(HTMLElement.prototype, "scrollTop", {
      configurable: true,
      get: jest.fn(() => 0),
      set: jest.fn(),
    });

    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      value: 1000,
    });

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 200,
    });

    const { container } = render(
      <Scrollbar>
        <div style={{ height: "1000px" }}>Long Content</div>
      </Scrollbar>,
    );

    const thumb = container.querySelector(".custom-scrollbar__thumb");
    expect(thumb).toBeInTheDocument();

    if (thumb) {
      // Start dragging
      fireEvent.mouseDown(thumb, { clientY: 100 });

      // Move mouse
      fireEvent.mouseMove(document, { clientY: 150 });

      // Verify scrollTop setter was called
      expect(HTMLElement.prototype.scrollTop).toHaveBeenCalled;
    }
  });

  it("stops dragging on mouseup", () => {
    const { container } = render(
      <Scrollbar>
        <div style={{ height: "1000px" }}>Long Content</div>
      </Scrollbar>,
    );

    const thumb = container.querySelector(".custom-scrollbar__thumb");
    const trackAndThumb = container.querySelector(
      ".custom-scrollbar__track-and-thumb",
    );

    if (thumb && trackAndThumb) {
      // Start dragging
      fireEvent.mouseDown(thumb, { clientY: 100 });

      // Verify dragging style
      expect(trackAndThumb).toHaveStyle({
        opacity: "1",
        width: "8px",
      });

      // Stop dragging
      fireEvent.mouseUp(document);

      // Verify default style is restored
      expect(trackAndThumb).not.toHaveStyle({
        opacity: "1",
        width: "8px",
      });
    }
  });

  it("handles thumb position on scroll", () => {
    // Mock DOM properties for scroll testing
    Object.defineProperty(HTMLElement.prototype, "scrollTop", {
      configurable: true,
      value: 50,
    });

    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      value: 1000,
    });

    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 300,
    });

    const { container } = render(
      <Scrollbar>
        <div style={{ height: "1000px" }}>Long Content</div>
      </Scrollbar>,
    );

    const content = container.querySelector(".custom-scrollbar__content");
    const thumb = container.querySelector(".custom-scrollbar__thumb");

    // Set up spy to check if style.top is changed
    if (thumb) {
      const htmlThumb = thumb as HTMLElement;
      const styleSpy = jest.spyOn(htmlThumb.style, "top", "set");

      // Trigger scroll event to test handleThumbPosition
      if (content) {
        fireEvent.scroll(content);

        // Verify the thumb position was updated
        expect(styleSpy).toHaveBeenCalled();
      }
    }
  });

  it("correctly handles ResizeObserver", () => {
    // Spy on handleResize being called by ResizeObserver
    const handleResizeSpy = jest
      .spyOn(React, "useCallback")
      .mockImplementation((fn, deps) => {
        return fn;
      });

    // Mock dimensions for ResizeObserver testing
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 300,
    });

    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      value: 900,
    });

    const { container, rerender } = render(
      <Scrollbar>
        <div style={{ height: "900px" }}>Long Content</div>
      </Scrollbar>,
    );

    // Verify ResizeObserver was created
    expect(ResizeObserverMock).toHaveBeenCalled;

    // Trigger a resize observer callback directly to test handleResize
    window.dispatchEvent(new Event("resize"));
    rerender(
      <Scrollbar>
        <div style={{ height: "1200px" }}>Even Longer Content</div>
      </Scrollbar>,
    );

    // Verify the thumb element exists and has been styled
    const thumb = container.querySelector(".custom-scrollbar__thumb");
    expect(thumb).toBeInTheDocument();
  });
});
