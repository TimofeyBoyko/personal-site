import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock sub-components
jest.mock("./sub-components/header", () => ({
  __esModule: true,
  default: ({ headerText }: { headerText: string | React.ReactNode }) => (
    <div data-testid="group-header">{headerText}</div>
  ),
}));

jest.mock("./sub-components/content-header", () => ({
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

jest.mock("./sub-components/tags-list", () => ({
  __esModule: true,
  default: ({ tags }: { tags: string[] }) => (
    <div data-testid="tags-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  ),
}));

jest.mock("./sub-components/icon-link", () => ({
  __esModule: true,
  default: () => <div data-testid="icon-link"></div>,
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
    const container = screen.getByText("Test content description").parentElement
      ?.parentElement;

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
    expect(contentHeader).toHaveTextContent(
      "SecondHeader: Test Content Second Header",
    );
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
      headerText: <img src="test.jpg" alt="Test" data-testid="header-image" />,
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
        expect(groupStyles.hoverEffect).toContain(
          groupStyles.hoverEffectGeneral,
        );
        expect(groupStyles.hoverEffect).toContain(groupStyles.hoverEffectLg);
      });
    });

    // Test content container styles
    describe("content container styles", () => {
      it("combines general and sm styles", () => {
        expect(groupStyles.contentContainer).toContain(
          groupStyles.contentContainerGeneral,
        );
        expect(groupStyles.contentContainer).toContain(
          groupStyles.contentContainerSm,
        );
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
        expect(groupStyles.contentHeaderMain).toBe(
          groupStyles.contentHeaderMainGeneral,
        );
      });

      it("contentHeaderLink returns the correct styles", () => {
        expect(groupStyles.contentHeaderLink).toBe(
          groupStyles.contentHeaderLinkGeneral,
        );
      });

      it("contentHeaderLinkSpan combines general and lg styles", () => {
        expect(groupStyles.contentHeaderLinkSpan).toContain(
          groupStyles.contentHeaderLinkSpanGeneral,
        );
        expect(groupStyles.contentHeaderLinkSpan).toContain(
          groupStyles.contentHeaderLinkSpanLg,
        );
      });

      it("contentSubHeader returns the correct styles", () => {
        expect(groupStyles.contentSubHeader).toBe(
          groupStyles.contentSubHeaderGeneral,
        );
      });
    });
  });
});

// Test Tag component
describe("Tag", () => {
  // Unmock the component for these tests
  jest.unmock("./sub-components/tag");
  const RealTag = jest.requireActual("./sub-components/tag").default;

  it("renders with the correct label", () => {
    render(<RealTag label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("applies the correct styles from groupStyles", () => {
    render(<RealTag label="TypeScript" />);
    const tagElement = screen.getByTestId("tag");
    expect(tagElement).toHaveClass(groupStyles.tag);
  });
});

// Test TagsList component
describe("TagsList", () => {
  // Mock the Tag component to isolate TagsList testing
  jest.mock("./sub-components/tag", () => ({
    __esModule: true,
    default: ({ label }: { label: string }) => (
      <div data-testid={`tag-${label}`}>{label}</div>
    ),
  }));

  // Unmock TagsList for these tests
  jest.unmock("./sub-components/tags-list");
  const RealTagsList = jest.requireActual("./sub-components/tags-list").default;

  const testTags = ["React", "TypeScript", "Next.js"];

  it("renders with the correct number of tags", () => {
    render(<RealTagsList tags={testTags} />);
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toBeInTheDocument();
    expect(tagsList.tagName).toBe("UL");
    expect(tagsList.children.length).toBe(testTags.length);
  });

  it("applies the correct styles from groupStyles", () => {
    render(<RealTagsList tags={testTags} />);
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toHaveClass(groupStyles.tagsListContainer);

    // Check that each list item has the correct class
    const listItems = tagsList.querySelectorAll("li");
    expect(listItems.length).toBe(testTags.length);
    listItems.forEach(item => {
      expect(item).toHaveClass(groupStyles.tagsListItem);
    });
  });

  it("passes the correct label to each Tag component", () => {
    render(<RealTagsList tags={testTags} />);
    testTags.forEach(tag => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });
  });
});

// Sub-component tests
describe("GroupHeader", () => {
  // Unmock for these specific tests
  jest.unmock("./sub-components/header");
  // Re-import to get the real component
  const RealGroupHeader = jest.requireActual("./sub-components/header").default;

  it("renders text header correctly", () => {
    render(<RealGroupHeader headerText="Test Header" />);
    expect(screen.getByText("Test Header")).toBeInTheDocument();
  });

  it("renders with correct classes for text header", () => {
    const { container } = render(<RealGroupHeader headerText="Test Header" />);
    const header = container.querySelector("header");
    expect(header).toHaveClass(groupStyles.headerBaseStyles);
    expect(header).toHaveClass(groupStyles.headerSm);
    expect(header).not.toHaveClass(groupStyles.headerHidden);
  });

  it("renders with hidden class for image header", () => {
    const ImageElement = (
      <img src="test.jpg" alt="test" data-testid="header-image" />
    );
    const { container } = render(<RealGroupHeader headerText={ImageElement} />);
    const header = container.querySelector("header");
    expect(header).toHaveClass(groupStyles.headerHidden);
  });
});

// Test Tag component
describe("Tag", () => {
  // Unmock the component for these tests
  jest.unmock("./sub-components/tag");
  const RealTag = jest.requireActual("./sub-components/tag").default;

  it("renders with the correct label", () => {
    render(<RealTag label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("applies the correct styles from groupStyles", () => {
    render(<RealTag label="TypeScript" />);
    const tagElement = screen.getByTestId("tag");
    expect(tagElement).toHaveClass(groupStyles.tag);
  });
});

// Test TagsList component
describe("TagsList", () => {
  // Mock the Tag component to isolate TagsList testing
  jest.mock("./sub-components/tag", () => ({
    __esModule: true,
    default: ({ label }: { label: string }) => (
      <div data-testid={`tag-${label}`}>{label}</div>
    ),
  }));

  // Unmock TagsList for these tests
  jest.unmock("./sub-components/tags-list");
  const RealTagsList = jest.requireActual("./sub-components/tags-list").default;

  const testTags = ["React", "TypeScript", "Next.js"];

  it("renders with the correct number of tags", () => {
    render(<RealTagsList tags={testTags} />);
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toBeInTheDocument();
    expect(tagsList.tagName).toBe("UL");
    expect(tagsList.children.length).toBe(testTags.length);
  });

  it("applies the correct styles from groupStyles", () => {
    render(<RealTagsList tags={testTags} />);
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toHaveClass(groupStyles.tagsListContainer);

    // Check that each list item has the correct class
    const listItems = tagsList.querySelectorAll("li");
    expect(listItems.length).toBe(testTags.length);
    listItems.forEach(item => {
      expect(item).toHaveClass(groupStyles.tagsListItem);
    });
  });

  it("passes the correct label to each Tag component", () => {
    render(<RealTagsList tags={testTags} />);
    testTags.forEach(tag => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });
  });
});

describe("ContentHeader", () => {
  // We need a custom ContentHeader test implementation that avoids the nesting issue
  // First, unmock content-header
  jest.unmock("./sub-components/content-header");

  // Keep IconLink mocked
  const mockIconLink = () => <span data-testid="icon-link-mock">icon</span>;
  jest.doMock("./sub-components/icon-link", () => ({
    __esModule: true,
    default: mockIconLink,
  }));

  // Re-import to get the real content-header but with mocked dependencies
  const RealContentHeader = jest.requireActual(
    "./sub-components/content-header",
  ).default;

  const contentHeaderProps = {
    mainLink: "https://example.com",
    contentHeader: "Main Header",
    contentSecondHeader: "Second Header",
    contentSubHeader: ["Sub Header 1", "Sub Header 2"],
  };

  it("renders with correct link", () => {
    const { container } = render(<RealContentHeader {...contentHeaderProps} />);

    // Verify link attributes without using screen.getByRole which has issues with nested links
    const linkElement = container.querySelector("a");
    expect(linkElement).toHaveAttribute("href", "https://example.com");
    expect(linkElement).toHaveAttribute("target", "_blank");
  });

  it("renders content header text correctly", () => {
    render(<RealContentHeader {...contentHeaderProps} />);
    expect(screen.getByText(/Main Header/)).toBeInTheDocument();
    expect(screen.getByText(/Second Header/)).toBeInTheDocument();
  });

  it("renders sub headers correctly", () => {
    render(<RealContentHeader {...contentHeaderProps} />);
    expect(screen.getByText("Sub Header 1")).toBeInTheDocument();
    expect(screen.getByText("Sub Header 2")).toBeInTheDocument();
  });

  it("renders icon link", () => {
    const { container } = render(<RealContentHeader {...contentHeaderProps} />);

    // Since we've mocked IconLink with a testid, we can check for it
    expect(screen.getByTestId("icon-link-mock")).toBeInTheDocument();

    // Verify that the second header is rendered with a dot separator
    expect(screen.getByText(/·/)).toBeInTheDocument();
    expect(screen.getByText(/Second Header/)).toBeInTheDocument();
  });

  it("renders without second header when not provided", () => {
    render(
      <RealContentHeader {...contentHeaderProps} contentSecondHeader="" />,
    );
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });
});

// Test Tag component
describe("Tag", () => {
  // Unmock the component for these tests
  jest.unmock("./sub-components/tag");
  const RealTag = jest.requireActual("./sub-components/tag").default;

  it("renders with the correct label", () => {
    render(<RealTag label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("applies the correct styles from groupStyles", () => {
    render(<RealTag label="TypeScript" />);
    const tagElement = screen.getByTestId("tag");
    expect(tagElement).toHaveClass(groupStyles.tag);
  });
});

// Test TagsList component
describe("TagsList", () => {
  // Mock the Tag component to isolate TagsList testing
  jest.mock("./sub-components/tag", () => ({
    __esModule: true,
    default: ({ label }: { label: string }) => (
      <div data-testid={`tag-${label}`}>{label}</div>
    ),
  }));

  // Unmock TagsList for these tests
  jest.unmock("./sub-components/tags-list");
  const RealTagsList = jest.requireActual("./sub-components/tags-list").default;

  const testTags = ["React", "TypeScript", "Next.js"];

  it("renders with the correct number of tags", () => {
    render(<RealTagsList tags={testTags} />);
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toBeInTheDocument();
    expect(tagsList.tagName).toBe("UL");
    expect(tagsList.children.length).toBe(testTags.length);
  });

  it("applies the correct styles from groupStyles", () => {
    render(<RealTagsList tags={testTags} />);
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toHaveClass(groupStyles.tagsListContainer);

    // Check that each list item has the correct class
    const listItems = tagsList.querySelectorAll("li");
    expect(listItems.length).toBe(testTags.length);
    listItems.forEach(item => {
      expect(item).toHaveClass(groupStyles.tagsListItem);
    });
  });

  it("passes the correct label to each Tag component", () => {
    render(<RealTagsList tags={testTags} />);
    testTags.forEach(tag => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });
  });
});

describe("IconLink", () => {
  // Unmock for these specific tests
  jest.unmock("./sub-components/icon-link");
  // Re-import to get the real component
  const RealIconLink = jest.requireActual("./sub-components/icon-link").default;

  it("renders svg element", () => {
    render(<RealIconLink />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has correct aria-hidden attribute", () => {
    render(<RealIconLink />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("has correct classNames for transitions and hover effects", () => {
    const { container } = render(<RealIconLink />);
    const svg = container.querySelector("svg");

    // Check that svg exists and has the expected classes
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute("class")).toContain("transition-transform");
    expect(svg?.getAttribute("class")).toContain("group-hover/link");
  });
});

// Test Tag component
describe("Tag", () => {
  // Unmock the component for these tests
  jest.unmock("./sub-components/tag");
  const RealTag = jest.requireActual("./sub-components/tag").default;

  it("renders with the correct label", () => {
    render(<RealTag label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("applies the correct styles from groupStyles", () => {
    render(<RealTag label="TypeScript" />);
    const tagElement = screen.getByTestId("tag");
    expect(tagElement).toHaveClass(groupStyles.tag);
  });
});

// Test TagsList component
describe("TagsList", () => {
  // Mock the Tag component to isolate TagsList testing
  jest.mock("./sub-components/tag", () => ({
    __esModule: true,
    default: ({ label }: { label: string }) => (
      <div data-testid={`tag-${label}`}>{label}</div>
    ),
  }));

  // Unmock TagsList for these tests
  jest.unmock("./sub-components/tags-list");
  const RealTagsList = jest.requireActual("./sub-components/tags-list").default;

  const testTags = ["React", "TypeScript", "Next.js"];

  it("renders with the correct number of tags", () => {
    render(<RealTagsList tags={testTags} />);
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toBeInTheDocument();
    expect(tagsList.tagName).toBe("UL");
    expect(tagsList.children.length).toBe(testTags.length);
  });

  it("applies the correct styles from groupStyles", () => {
    render(<RealTagsList tags={testTags} />);
    const tagsList = screen.getByTestId("tags-list");
    expect(tagsList).toHaveClass(groupStyles.tagsListContainer);

    // Check that each list item has the correct class
    const listItems = tagsList.querySelectorAll("li");
    expect(listItems.length).toBe(testTags.length);
    listItems.forEach(item => {
      expect(item).toHaveClass(groupStyles.tagsListItem);
    });
  });

  it("passes the correct label to each Tag component", () => {
    render(<RealTagsList tags={testTags} />);
    testTags.forEach(tag => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });
  });
});
