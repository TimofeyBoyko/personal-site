import { render, screen } from "@testing-library/react";

// Mock react-device-detect with a setter so we can toggle isMobile
let isMobileMock = false;
vi.mock("react-device-detect", () => ({
  get isMobile() {
    return isMobileMock;
  },
  set isMobile(value) {
    isMobileMock = value;
  },
}));

import { cursorStyles } from "./Cursor.styles";
import Cursor from "./index";

describe("Cursor", () => {
  // Mock the window.addEventListener
  const addEventListenerSpy = vi.spyOn(window, "addEventListener");
  const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it("renders the cursor div when not on mobile", () => {
    render(<Cursor />);

    const cursorElement = screen.getByTestId("cursor");
    expect(cursorElement).toBeInTheDocument();
    expect(cursorElement).toHaveAttribute("id", "cursor");
    expect(cursorElement).toHaveClass("z-30");
  });

  it("adds and removes event listeners", () => {
    const { unmount } = render(<Cursor />);

    // Check if addEventListener was called with correct arguments
    expect(addEventListenerSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));

    // Unmount the component
    unmount();

    // Check if removeEventListener was called with correct arguments
    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });

  it("sets up an event listener for mouse movement", () => {
    render(<Cursor />);

    // This is a simpler test that just verifies the mousemove event listener is added
    expect(addEventListenerSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });

  it("renders an empty div on mobile devices", () => {
    // Set isMobile to true
    isMobileMock = true;

    render(<Cursor />);

    // Verify no cursor element is rendered
    expect(screen.queryByTestId("cursor")).not.toBeInTheDocument();

    // Reset isMobile for other tests
    isMobileMock = false;
  });

  it("correctly formats the background gradient style", () => {
    // Test the actual implementation of getBackgroundStyle
    const result = cursorStyles.getBackgroundStyle(100, 200);

    // Verify the formatted gradient string is correct
    expect(result).toBe(
      "radial-gradient(600px at 100px 200px, rgba(29, 78, 216, 0.15) 0%, transparent 80%)",
    );
  });

  it("uses the background style from cursorStyles", () => {
    // Create a mock implementation that we can access
    const mockGetBackgroundStyle = vi.fn().mockReturnValue("mocked-background-style");
    const originalGetBackgroundStyle = cursorStyles.getBackgroundStyle;

    // Replace the method with our mock before rendering
    cursorStyles.getBackgroundStyle = mockGetBackgroundStyle;

    // Get the callback function during render
    let capturedCallback: (event: MouseEvent) => void = () => {
      // Intentionally empty - will be replaced by addEventListener mock
    };

    const originalAddEventListener = window.addEventListener;
    window.addEventListener = vi.fn(
      (event: string, callback: EventListenerOrEventListenerObject) => {
        if (event === "mousemove") {
          capturedCallback = callback as (event: MouseEvent) => void;
        }
      },
    );

    render(<Cursor />);

    // Create a mock event
    const mockEvent = new MouseEvent("mousemove", {
      clientX: 100,
      clientY: 200,
    });

    // Call the callback directly with our mock event
    if (capturedCallback) {
      capturedCallback(mockEvent);
    }

    // Verify our mock was called with the right parameters
    expect(mockGetBackgroundStyle).toHaveBeenCalledWith(100, 200);

    // Restore the original method
    cursorStyles.getBackgroundStyle = originalGetBackgroundStyle;
    // Restore addEventListener
    window.addEventListener = originalAddEventListener;
  });
});
