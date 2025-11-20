import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

// Mock data files
jest.mock(
  "@/data/personal.json",
  () => ({
    name: "John Doe",
    currentRole: "Software Developer",
    description: "Passionate about building awesome web applications",
  }),
  { virtual: true },
);

jest.mock(
  "@/data/social.json",
  () => ({
    items: [
      {
        name: "Github",
        link: "https://github.com/johndoe",
      },
      {
        name: "LinkedIn",
        link: "https://linkedin.com/in/johndoe",
      },
    ],
  }),
  { virtual: true },
);

// Mock GitHub SVG component
jest.mock("../../../public/github.svg", () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="github-svg" {...props} />,
}));

// Mock sub-components for main Header tests
jest.mock("./sub-components/header-info", () => ({
  __esModule: true,
  default: () => <div data-testid="header-info">Header Info Component</div>,
}));

jest.mock("./sub-components/header-navigation", () => ({
  __esModule: true,
  default: () => <div data-testid="header-navigation">Navigation Component</div>,
}));

jest.mock("./sub-components/header-social", () => ({
  __esModule: true,
  default: () => <div data-testid="header-social">Social Component</div>,
}));

import { headerStyles } from "./Header.styles";
import type { NavigationItemType } from "./Header.types";
// Import components
import Header from "./index";

// Main Header tests
describe("Header Component", () => {
  it("renders correctly with all sub-components", () => {
    render(<Header />);

    // Check if all sub-components are rendered
    expect(screen.getByTestId("header-info")).toBeInTheDocument();
    expect(screen.getByTestId("header-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("header-social")).toBeInTheDocument();
  });

  it("applies the correct container styles", () => {
    const { container } = render(<Header />);
    const headerContainer = container.firstChild;

    expect(headerContainer).toHaveClass(headerStyles.containerGeneral);
    expect(headerContainer).toHaveClass(headerStyles.containerLg);
  });

  it("renders with correct structure - Info and Navigation grouped together", () => {
    const { container } = render(<Header />);

    // Get the header's first child (the div wrapping Info and Navigation)
    const headerFirstChild = container.firstChild?.firstChild;

    // It should contain both Info and Navigation
    expect(headerFirstChild?.firstChild).toHaveAttribute("data-testid", "header-info");
    expect(headerFirstChild?.lastChild).toHaveAttribute("data-testid", "header-navigation");
  });

  it("renders Social separate from Info and Navigation", () => {
    const { container } = render(<Header />);

    // Get the header's last child (should be Social)
    const headerLastChild = container.firstChild?.lastChild;

    expect(headerLastChild).toHaveAttribute("data-testid", "header-social");
  });
});

// Info Component Tests
describe("Header Info Component", () => {
  // Unmock for specific component tests
  beforeEach(() => {
    jest.unmock("./sub-components/header-info");
  });

  // Re-import the real component
  const RealInfo = jest.requireActual("./sub-components/header-info").default;

  it("renders name in the correct element", () => {
    render(<RealInfo />);
    const titleElement = screen.getByTestId("info-title");
    expect(titleElement).toBeInTheDocument();
    // Verify the element has content (without checking exact text)
    expect(titleElement.textContent).toBeTruthy();
  });

  it("renders current role in the correct element", () => {
    render(<RealInfo />);
    const subtitleElement = screen.getByTestId("info-subtitle");
    expect(subtitleElement).toBeInTheDocument();
    // Verify the element has content (without checking exact text)
    expect(subtitleElement.textContent).toBeTruthy();
  });

  it("renders description in the correct element", () => {
    render(<RealInfo />);
    const descElement = screen.getByTestId("info-description");
    expect(descElement).toBeInTheDocument();
    // Verify the element has content (without checking exact text)
    expect(descElement.textContent).toBeTruthy();
  });

  it("applies the correct styles to elements", () => {
    render(<RealInfo />);

    const nameElement = screen.getByTestId("info-title");
    const roleElement = screen.getByTestId("info-subtitle");
    const descElement = screen.getByTestId("info-description");

    expect(nameElement).toHaveClass(headerStyles.infoTitleGeneral);
    expect(nameElement).toHaveClass(headerStyles.infoTitleLg);
    expect(roleElement).toHaveClass(headerStyles.infoSubtitleGeneral);
    expect(roleElement).toHaveClass(headerStyles.infoSubtitleLg);
    expect(descElement).toHaveClass(headerStyles.infoDescriptionGeneral);
  });
});

// Navigation Component Tests
describe("Header Navigation Component", () => {
  // Mock scroll event listener setup
  const mockAddEventListener = jest.fn();
  const mockRemoveEventListener = jest.fn();
  const mockGetElementById = jest.fn().mockImplementation((id) => ({
    getBoundingClientRect: () => ({ top: id === "about" ? -10 : 10 }),
  }));

  const mockScrollElement = {
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
  };

  beforeEach(() => {
    // Unmock for specific component tests
    jest.unmock("./sub-components/header-navigation");

    // Setup mocks
    document.getElementById = mockGetElementById;
    document.getElementsByClassName = jest.fn().mockImplementation(() => [mockScrollElement]);

    // Control useState for testing
    jest.spyOn(React, "useState").mockImplementation(() => {
      const mockData: NavigationItemType[] = [
        { label: "about", href: "#about", isActive: true },
        { label: "experience", href: "#experience", isActive: false },
        { label: "projects", href: "#projects", isActive: false },
      ];
      return [mockData, jest.fn()] as const;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Re-import the real component
  const RealNavigation = jest.requireActual("./sub-components/header-navigation").default;

  it("renders navigation links with correct labels", () => {
    render(<RealNavigation />);

    expect(screen.getByText("about")).toBeInTheDocument();
    expect(screen.getByText("experience")).toBeInTheDocument();
    expect(screen.getByText("projects")).toBeInTheDocument();
  });

  it("applies the correct styles to navigation container", () => {
    render(<RealNavigation />);

    const navContainer = screen.getByTestId("navigation-container");
    expect(navContainer).toHaveClass(headerStyles.navigationContainerGeneral);
    expect(navContainer).toHaveClass(headerStyles.navigationContainerLg);
  });

  it("applies correct styling and ARIA attributes to active navigation items", () => {
    render(<RealNavigation />);

    // The first nav item (about) should have aria-current="page" and active styling
    const activeLink = screen.getByTestId("nav-link-about");
    expect(activeLink).toHaveAttribute("aria-current", "page");

    // Check for active indicator and text elements inside the active link
    const activeIndicator = activeLink.querySelector("span:first-child");
    const activeText = activeLink.querySelector("span:last-child");
    expect(activeIndicator).toHaveClass(headerStyles.navigationIndicatorActiveState);
    expect(activeText).toHaveClass(headerStyles.navigationTextActiveState);

    // Other items should not have aria-current attribute
    const nonActiveLink = screen.getByTestId("nav-link-experience");
    expect(nonActiveLink).not.toHaveAttribute("aria-current");

    // Non-active link should have regular styling
    const nonActiveIndicator = nonActiveLink.querySelector("span:first-child");
    const nonActiveText = nonActiveLink.querySelector("span:last-child");
    expect(nonActiveIndicator).toHaveClass(headerStyles.navigationIndicatorGeneral);
    expect(nonActiveText).toHaveClass(headerStyles.navigationTextGeneral);
  });

  it("sets up scroll event listeners on mount", () => {
    const { unmount } = render(<RealNavigation />);

    // Check if event listener was added
    expect(mockAddEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));

    // Unmount to check cleanup
    unmount();

    // Check if event listener was removed
    expect(mockRemoveEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("updates active state based on scroll position", () => {
    // Extract the scroll callback to test it directly
    render(<RealNavigation />);

    // Find the callback that was passed to addEventListener
    const scrollCallback = mockAddEventListener.mock.calls[0][1];

    // Call the scroll callback to trigger the scroll handler
    scrollCallback();

    // The setter function should have been called after scroll event
    const setItemsMock = jest.spyOn(React, "useState").mock.results[0].value[1];
    expect(setItemsMock).toHaveBeenCalled();
  });

  it("handles different DOM element states in scroll handler", () => {
    // Mock different getBoundingClientRect responses
    document.getElementById = jest.fn().mockImplementation((id) => {
      // Return null for some elements to test that case
      if (id === "projects") return null;
      return {
        getBoundingClientRect: () => ({ top: id === "about" ? -10 : 10 }),
      };
    });

    render(<RealNavigation />);

    // Find and call the scroll callback
    const scrollCallback = mockAddEventListener.mock.calls[0][1];
    scrollCallback();

    // If we got here without errors, the handler correctly dealt with
    // null elements and different getBoundingClientRect responses
    expect(true).toBeTruthy();
  });
});

// Social Component Tests
describe("Header Social Component", () => {
  beforeEach(() => {
    // Unmock for specific component tests
    jest.unmock("./sub-components/header-social");
  });

  // Re-import the real component
  const RealSocial = jest.requireActual("./sub-components/header-social").default;

  it("renders social links", () => {
    const { container } = render(<RealSocial />);

    // Check that social items exist
    const socialItems = container.querySelectorAll("li");
    expect(socialItems.length).toBeGreaterThan(0);
  });

  it("renders GitHub icon for GitHub link", () => {
    render(<RealSocial />);

    // GitHub SVG should be rendered
    expect(screen.getByTestId("github-svg")).toBeInTheDocument();
  });

  it("renders GitHub icon for GitHub items and nothing for non-GitHub items", () => {
    render(<RealSocial />);

    // Get all rendered social items
    const socialItems = screen.getAllByTestId(/^social-item-/);

    // At least one item should be rendered
    expect(socialItems.length).toBeGreaterThan(0);

    // Check each social item
    socialItems.forEach((item) => {
      // Extract the name from the data-testid attribute
      const itemName = item.getAttribute("data-testid")?.replace("social-item-", "");

      if (itemName === "Github") {
        // GitHub items should have the GitHub SVG
        const githubSvgs = item.querySelectorAll('[data-testid="github-svg"]');
        expect(githubSvgs.length).toBe(1);
      } else if (itemName) {
        // Non-GitHub items should not have the GitHub SVG
        const githubSvgs = item.querySelectorAll('[data-testid="github-svg"]');
        expect(githubSvgs.length).toBe(0);
      }
    });

    // Direct test of line 11 functionality - check that a GitHub item has an icon
    const githubItem = screen.queryByTestId("social-item-Github");
    expect(githubItem).not.toBeNull();
    if (githubItem) {
      expect(githubItem.querySelector('[data-testid="github-svg"]')).toBeInTheDocument();
    }
  });

  it("applies the correct styles to social list", () => {
    render(<RealSocial />);

    const socialList = screen.getByTestId("social-list");
    expect(socialList).toHaveClass(headerStyles.socialListGeneral);
  });

  it("renders links with href attributes", () => {
    render(<RealSocial />);

    const links = screen.getAllByRole("link");
    // Check that links have href attribute (without checking exact value)
    expect(links[0]).toHaveAttribute("href");
    // Check that GitHub link contains github.com in the URL
    expect(links[0].getAttribute("href")).toContain("github.com");
  });

  it("renders links with target=_blank", () => {
    render(<RealSocial />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("target", "_blank");
  });
});
