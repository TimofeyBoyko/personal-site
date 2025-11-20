import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import type { SectionProps } from "@/components/section/Section.types";

// Mock the Section component
jest.mock("@/components/section", () => ({
  __esModule: true,
  default: ({ id, headerName, isLast, children }: SectionProps) => (
    <div
      data-testid="section-mock"
      data-id={id}
      data-header={headerName}
      data-islast={isLast.toString()}
    >
      {children}
    </div>
  ),
}));

// Mock the actual implementation instead of mocking parseTextToJSX
jest.mock(
  "@/utils",
  () => ({
    parseTextToJSX: (text: string) => {
      // Return real paragraphs for testing instead of a simple prefix
      return text;
    },
  }),
  { virtual: true },
);

// Mock the about data with real structure
jest.mock(
  "@/data/about.json",
  () => ({
    items: [
      {
        text: "Even as a teenager, I was interested in computers",
        links: [],
      },
      {
        text: "My main focus these days is developing",
        links: [],
      },
      {
        text: "When I'm not on the computer",
        links: [],
      },
    ],
  }),
  { virtual: true },
);

import SectionAbout from "./index";
import { sectionAboutStyles } from "./SectionAbout.styles";

describe("SectionAbout", () => {
  it("renders the section component with correct props", () => {
    render(<SectionAbout />);

    const sectionMock = screen.getByTestId("section-mock");
    expect(sectionMock).toHaveAttribute("data-id", "about");
    expect(sectionMock).toHaveAttribute("data-header", "About");
    expect(sectionMock).toHaveAttribute("data-islast", "false");
  });

  it("renders the correct number of paragraphs", () => {
    render(<SectionAbout />);

    // Find all paragraph elements directly
    const paragraphs = document.querySelectorAll("p");
    expect(paragraphs.length).toBe(3);
  });

  it("renders all paragraphs with the correct content", () => {
    render(<SectionAbout />);

    // Check if paragraphs contain the expected text (partial matching)
    expect(
      screen.getByText(/Even as a teenager, I was interested in computers/),
    ).toBeInTheDocument();
    expect(screen.getByText(/My main focus these days is developing/)).toBeInTheDocument();
    expect(screen.getByText(/When I'm not on the computer/)).toBeInTheDocument();
  });

  it("applies correct margin classes based on paragraph position", () => {
    render(<SectionAbout />);

    // Get paragraphs directly from the document
    const paragraphs = document.querySelectorAll("p");

    // First two paragraphs should have margin bottom
    expect(paragraphs[0]).toHaveClass("mb-4");
    expect(paragraphs[1]).toHaveClass("mb-4");

    // Last paragraph should not have margin bottom
    expect(paragraphs[2]).not.toHaveClass("mb-4");
  });

  // Test styles object
  describe("sectionAboutStyles", () => {
    it("returns correct paragraph classes based on isLast prop", () => {
      expect(sectionAboutStyles.getParagraphClass(true)).toBe(sectionAboutStyles.paragraphNoMargin);
      expect(sectionAboutStyles.getParagraphClass(false)).toBe(
        sectionAboutStyles.paragraphWithMargin,
      );
    });
  });
});
