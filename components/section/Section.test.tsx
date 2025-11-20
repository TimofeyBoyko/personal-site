import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Section from "./index";
import { sectionStyles } from "./Section.styles";

describe("Section", () => {
  const defaultProps = {
    id: "test-section",
    headerName: "Test Section",
    isLast: false,
    children: <div data-testid="section-content">Test Content</div>,
  };

  it("renders children correctly", () => {
    render(<Section {...defaultProps} />);
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
    expect(screen.getByTestId("section-content")).toHaveTextContent("Test Content");
  });

  it("renders header with the correct text", () => {
    render(<Section {...defaultProps} />);
    expect(screen.getByText("Test Section")).toBeInTheDocument();
  });

  it("uses the correct id attribute", () => {
    render(<Section {...defaultProps} />);
    const section = screen.getByTestId("section-content").parentElement;
    expect(section).toHaveAttribute("id", "test-section");
  });

  it("applies different styles based on isLast prop", () => {
    // Test when isLast is false
    const { rerender } = render(<Section {...defaultProps} isLast={false} />);
    const sectionNotLast = screen.getByTestId("section-content").parentElement;
    expect(sectionNotLast).toHaveClass(sectionStyles.sectionNotLastLg);

    // Test when isLast is true
    rerender(<Section {...defaultProps} isLast={true} />);
    const sectionLast = screen.getByTestId("section-content").parentElement;
    expect(sectionLast).toHaveClass(sectionStyles.sectionLastLg);
  });

  // Test sectionStyles object
  describe("sectionStyles", () => {
    describe("getContainerStyles", () => {
      it("includes general styles for all sections", () => {
        const styles = sectionStyles.getContainerStyles(false);
        expect(styles).toContain(sectionStyles.sectionGeneral);
        expect(styles).toContain(sectionStyles.sectionScrollLg);
      });

      it("includes last section styles when isLast is true", () => {
        const styles = sectionStyles.getContainerStyles(true);
        expect(styles).toContain(sectionStyles.sectionLastLg);
        expect(styles).not.toContain(sectionStyles.sectionNotLastLg);
      });

      it("includes not-last section styles when isLast is false", () => {
        const styles = sectionStyles.getContainerStyles(false);
        expect(styles).toContain(sectionStyles.sectionNotLastLg);
        expect(styles).not.toContain(sectionStyles.sectionLastLg);
      });
    });

    describe("headerContainer", () => {
      it("combines general and breakpoint styles", () => {
        expect(sectionStyles.headerContainer).toContain(sectionStyles.headerContainerGeneral);
        expect(sectionStyles.headerContainer).toContain(sectionStyles.headerContainerLg);
      });
    });

    describe("headerText", () => {
      it("combines general and breakpoint styles", () => {
        expect(sectionStyles.headerText).toContain(sectionStyles.headerTextGeneral);
        expect(sectionStyles.headerText).toContain(sectionStyles.headerTextLg);
      });
    });
  });
});
