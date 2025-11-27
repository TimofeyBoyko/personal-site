import { render, screen } from "@testing-library/react";
import Image from "next/image";
import type React from "react";

// Mock sub-components
vi.mock("./sub-components/header", () => ({
  __esModule: true,
  default: ({ headerText }: { headerText: string | React.ReactNode }) => (
    <div data-testid="group-header">{headerText}</div>
  ),
}));

vi.mock("./sub-components/content-header", () => ({
  __esModule: true,
  default: ({
    mainLink,
    contentHeader,
    contentSecondHeader,
    contentSubHeader,
  }: {
    mainLink: string;
    contentHeader: string;
    contentSecondHeader: string;
    contentSubHeader: string[];
  }) => (
    <div data-testid="content-header">
      <div>Link: {mainLink}</div>
      <div>Header: {contentHeader}</div>
      <div>SecondHeader: {contentSecondHeader}</div>
      {contentSubHeader.map((header) => (
        <div key={header}>SubHeader: {header}</div>
      ))}
    </div>
  ),
}));

vi.mock("./sub-components/tags-list", () => ({
  __esModule: true,
  default: ({ tags }: { tags: string[] }) => (
    <div data-testid="tags-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  ),
}));

vi.mock("./sub-components/icon-link", () => ({
  __esModule: true,
  default: () => <div data-testid="icon-link" />,
}));

import { groupStyles } from "./Group.styles";
import Group from "./index";

describe("Group", () => {
  const defaultProps = {
    headerText: "Test Header",
    mainLink: "https://example.com",
    contentHeader: "Test Content Header",
    contentSecondHeader: "Test Content Second Header",
    contentSubHeader: ["Test Sub Header 1", "Test Sub Header 2"],
    content: "Test content description",
    tags: ["tag1", "tag2", "tag3"],
  };

  it("renders all sub-components correctly", () => {
    render(<Group {...defaultProps} />);

    // Check that all sub-components are rendered
    expect(screen.getByTestId("group-header")).toBeInTheDocument();
    expect(screen.getByTestId("content-header")).toBeInTheDocument();
    expect(screen.getByTestId("tags-list")).toBeInTheDocument();

    // Check that main content is rendered
    expect(screen.getByText("Test content description")).toBeInTheDocument();
  });

  it("applies the correct styles to container", () => {
    render(<Group {...defaultProps} />);

    // Get the main container element
    const container = screen.getByText("Test content description").parentElement?.parentElement;

    // Check if it has the container class
    expect(container).toHaveClass(groupStyles.general);
  });

  it("passes the correct props to sub-components", () => {
    render(<Group {...defaultProps} />);

    // Check header content
    expect(screen.getByTestId("group-header")).toHaveTextContent("Test Header");

    // Check content header props
    const contentHeader = screen.getByTestId("content-header");
    expect(contentHeader).toHaveTextContent("Link: https://example.com");
    expect(contentHeader).toHaveTextContent("Header: Test Content Header");
    expect(contentHeader).toHaveTextContent("SecondHeader: Test Content Second Header");
    expect(contentHeader).toHaveTextContent("SubHeader: Test Sub Header 1");
    expect(contentHeader).toHaveTextContent("SubHeader: Test Sub Header 2");

    // Check tags
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toHaveTextContent("tag1");
    expect(tagsList).toHaveTextContent("tag2");
    expect(tagsList).toHaveTextContent("tag3");
  });

  it("renders hover effect element", () => {
    render(<Group {...defaultProps} />);

    // Now we can directly test the hover effect element using data-testid
    const hoverDiv = screen.getByTestId("hover-effect");
    expect(hoverDiv).toBeInTheDocument();

    // Verify the hover effect has the correct class name
    expect(hoverDiv).toHaveClass(groupStyles.hoverEffectGeneral);

    // Also verify the styles contain what we expect
    expect(groupStyles.hoverEffect).toContain("rounded-md");
    expect(groupStyles.hoverEffect).toContain("transition");
  });

  it("renders with an image as headerText", () => {
    // Create props with an image as headerText
    const propsWithImage = {
      ...defaultProps,
      headerText: (
        <Image src="/test.jpg" alt="Test" data-testid="header-image" width={100} height={100} />
      ),
    };

    render(<Group {...propsWithImage} />);

    // The header should still be rendered
    const header = screen.getByTestId("group-header");
    expect(header).toBeInTheDocument();

    // The image should be inside the header
    expect(screen.getByTestId("header-image")).toBeInTheDocument();
  });

  // Test groupStyles object
  describe("groupStyles", () => {
    // Test container styles
    describe("container styles", () => {
      it("includes general styles", () => {
        expect(groupStyles.container).toContain(groupStyles.general);
      });

      it("includes sm breakpoint styles", () => {
        expect(groupStyles.container).toContain(groupStyles.sm);
      });

      it("includes lg breakpoint styles", () => {
        expect(groupStyles.container).toContain(groupStyles.lg);
      });
    });

    // Test hover effect styles
    describe("hover effect styles", () => {
      it("combines general and lg styles", () => {
        expect(groupStyles.hoverEffect).toContain(groupStyles.hoverEffectGeneral);
        expect(groupStyles.hoverEffect).toContain(groupStyles.hoverEffectLg);
      });
    });

    // Test content container styles
    describe("content container styles", () => {
      it("combines general and sm styles", () => {
        expect(groupStyles.contentContainer).toContain(groupStyles.contentContainerGeneral);
        expect(groupStyles.contentContainer).toContain(groupStyles.contentContainerSm);
      });
    });

    // Test header classes function
    describe("getHeaderClasses function", () => {
      it("includes base styles and sm styles when not an image", () => {
        const classes = groupStyles.getHeaderClasses(false);
        expect(classes).toContain(groupStyles.headerBaseStyles);
        expect(classes).toContain(groupStyles.headerSm);
        expect(classes).not.toContain(groupStyles.headerHidden);
      });

      it("includes hidden class when it is an image", () => {
        const classes = groupStyles.getHeaderClasses(true);
        expect(classes).toContain(groupStyles.headerBaseStyles);
        expect(classes).toContain(groupStyles.headerSm);
        expect(classes).toContain(groupStyles.headerHidden);
      });
    });

    // Test content header style getters
    describe("content header style getters", () => {
      it("contentHeaderMain returns the correct styles", () => {
        expect(groupStyles.contentHeaderMain).toBe(groupStyles.contentHeaderMainGeneral);
      });

      it("contentHeaderLink returns the correct styles", () => {
        expect(groupStyles.contentHeaderLink).toBe(groupStyles.contentHeaderLinkGeneral);
      });

      it("contentHeaderLinkSpan combines general and lg styles", () => {
        expect(groupStyles.contentHeaderLinkSpan).toContain(
          groupStyles.contentHeaderLinkSpanGeneral,
        );
        expect(groupStyles.contentHeaderLinkSpan).toContain(groupStyles.contentHeaderLinkSpanLg);
      });

      it("contentSubHeader returns the correct styles", () => {
        expect(groupStyles.contentSubHeader).toBe(groupStyles.contentSubHeaderGeneral);
      });
    });
  });
});
