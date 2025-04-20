import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SectionProps } from "@/components/section/Section.types";
import { GroupProps } from "@/components/group/Group.types";

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

// Mock the Group component
jest.mock("@/components/group", () => ({
  __esModule: true,
  default: ({
    headerText,
    mainLink,
    contentHeader,
    contentSecondHeader,
    contentSubHeader,
    content,
    tags,
  }: GroupProps) => (
    <div
      data-testid="group-mock"
      data-link={mainLink}
      data-header={contentHeader}
      data-second={contentSecondHeader}
    >
      <div data-testid="group-date">{headerText}</div>
      <div data-testid="group-subroles">{contentSubHeader?.join(", ")}</div>
      <div data-testid="group-content">{content}</div>
      <div data-testid="group-tags">{tags?.join(", ")}</div>
    </div>
  ),
}));

// Mock the experience data
jest.mock(
  "@/data/experience.json",
  () => ({
    items: [
      {
        company: "ONLYOFFICE",
        position: "Frontend Developer",
        link: "https://www.onlyoffice.com",
        dates: "2021 — Present",
        subRoles: ["Main Developer"],
        description:
          "Build front-end of a cloud-based document management and collaboration solution that allows users to create, edit, and share documents in real time. Implemented OAuth2 protocol for secure authentication and developed an AI chat integration. Share skills and knowledge about project with colleagues. Also create Plugin SDK, that allow integrate third-party functionality into DocSpace.",
        tags: [
          "JavaScript",
          "TypeScript",
          "HTML & SCSS",
          "React",
          "NextJS",
          "Styled Components",
          "Mobx",
          "Jest",
          "React Testing Library",
          "Webpack",
          "Nodejs",
        ],
      },
    ],
  }),
  { virtual: true },
);

import { sectionExperienceStyles } from "./SectionExperience.styles";
import SectionExperience from "./index";

describe("SectionExperience", () => {
  it("renders the section component with correct props", () => {
    render(<SectionExperience />);

    const sectionMock = screen.getByTestId("section-mock");
    expect(sectionMock).toHaveAttribute("data-id", "experience");
    expect(sectionMock).toHaveAttribute("data-header", "Experience");
    expect(sectionMock).toHaveAttribute("data-islast", "false");
  });

  it("renders the correct number of experience entries", () => {
    render(<SectionExperience />);

    const groupMocks = screen.getAllByTestId("group-mock");
    expect(groupMocks).toHaveLength(1);
  });

  it("passes correct props to Group components", () => {
    render(<SectionExperience />);

    const groupMocks = screen.getAllByTestId("group-mock");

    expect(groupMocks[0]).toHaveAttribute(
      "data-link",
      "https://www.onlyoffice.com",
    );
    expect(groupMocks[0]).toHaveAttribute("data-header", "Frontend Developer");
    expect(groupMocks[0]).toHaveAttribute("data-second", "ONLYOFFICE");
  });

  it("renders dates correctly", () => {
    render(<SectionExperience />);

    const dates = screen.getAllByTestId("group-date");
    expect(dates[0]).toHaveTextContent("2021 — Present");
  });

  it("applies correct styles to list items", () => {
    render(<SectionExperience />);

    const items = screen.getAllByTestId("group-mock");
    // Since there's only one item and it's the last one, it shouldn't have the margin-bottom class
    expect(items[0]).not.toHaveClass("mb-12");
  });

  it("renders sub-roles correctly", () => {
    render(<SectionExperience />);

    const subRoles = screen.getAllByTestId("group-subroles");
    expect(subRoles[0]).toHaveTextContent("Main Developer");
  });

  it("renders descriptions correctly", () => {
    render(<SectionExperience />);

    const descriptions = screen.getAllByTestId("group-content");
    expect(descriptions[0]).toHaveTextContent(
      "Build front-end of a cloud-based document management and collaboration solution"
    );
    expect(descriptions[0]).toHaveTextContent(
      "Implemented OAuth2 protocol for secure authentication and developed an AI chat integration"
    );
    expect(descriptions[0]).toHaveTextContent(
      "create Plugin SDK, that allow integrate third-party functionality"
    );
  });

  // Test styles object
  describe("sectionExperienceStyles", () => {
    it("returns correct list item classes based on isLast prop", () => {
      expect(sectionExperienceStyles.getListItemClass(true)).toBe(
        sectionExperienceStyles.listItemNoMargin,
      );
      expect(sectionExperienceStyles.getListItemClass(false)).toBe(
        sectionExperienceStyles.listItemWithMargin,
      );
    });
  });
});
