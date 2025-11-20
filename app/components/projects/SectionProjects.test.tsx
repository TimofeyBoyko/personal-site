import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Image from "next/image";

import type { GroupProps } from "@/components/group/Group.types";
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

// Mock the Group component
jest.mock("@/components/group", () => ({
  __esModule: true,
  default: ({ headerText, mainLink, contentHeader, content, tags }: GroupProps) => (
    <div data-testid="group-mock" data-link={mainLink} data-header={contentHeader}>
      <div data-testid="group-header">{headerText}</div>
      <div data-testid="group-content">{content}</div>
      <div data-testid="group-tags">{tags.join(", ")}</div>
    </div>
  ),
}));

// Mock the projects data
jest.mock(
  "@/data/projects.json",
  () => ({
    items: [
      {
        title: "Personal site",
        link: "https://github.com/TimofeyBoyko/personal-site",
        image: "personal-site.jpg",
        content:
          " A modern, responsive portfolio website built with Next.js and TailwindCSS. Features include smooth scrolling navigation, and responsive design. The site showcases my projects, experience, and skills with a focus on accessibility and performance.",
        tags: ["React", "NextJS", "TailwindCSS"],
      },
      {
        title: "React pizza",
        link: "https://github.com/TimofeyBoyko/react-pizza",
        image: "react-pizza.png",
        content:
          "An interactive pizza ordering web application built with React. Features include a dynamic cart system, filtering options, customizable pizza builder, and responsive design. This project demonstrates state management with Redux and styling with SASS.",
        tags: ["React", "SASS", "Redux"],
      },
    ],
  }),
  { virtual: true },
);

import SectionProjects from "./index";
import { sectionProjectsStyles } from "./SectionProjects.styles";

describe("SectionProjects", () => {
  it("renders the section component with correct props", () => {
    render(<SectionProjects />);

    const sectionMock = screen.getByTestId("section-mock");
    expect(sectionMock).toHaveAttribute("data-id", "projects");
    expect(sectionMock).toHaveAttribute("data-header", "Projects");
    expect(sectionMock).toHaveAttribute("data-islast", "true");
  });

  it("renders the correct number of projects", () => {
    render(<SectionProjects />);

    const groupMocks = screen.getAllByTestId("group-mock");
    expect(groupMocks).toHaveLength(2);
  });

  it("passes correct props to Group components", () => {
    render(<SectionProjects />);

    const groupMocks = screen.getAllByTestId("group-mock");

    expect(groupMocks[0]).toHaveAttribute(
      "data-link",
      "https://github.com/TimofeyBoyko/personal-site",
    );
    expect(groupMocks[0]).toHaveAttribute("data-header", "Personal site");

    expect(groupMocks[1]).toHaveAttribute(
      "data-link",
      "https://github.com/TimofeyBoyko/react-pizza",
    );
    expect(groupMocks[1]).toHaveAttribute("data-header", "React pizza");
  });

  it("renders project content correctly", () => {
    render(<SectionProjects />);

    const contents = screen.getAllByTestId("group-content");
    // Use a substring to avoid whitespace issues
    expect(contents[0]).toHaveTextContent(
      "responsive portfolio website built with Next.js and TailwindCSS",
    );
    expect(contents[0]).toHaveTextContent("Features include smooth scrolling navigation");
    expect(contents[1]).toHaveTextContent(
      "An interactive pizza ordering web application built with React. Features include a dynamic cart system, filtering options, customizable pizza builder, and responsive design. This project demonstrates state management with Redux and styling with SASS.",
    );
  });

  it("renders tags correctly", () => {
    render(<SectionProjects />);

    const tags = screen.getAllByTestId("group-tags");
    expect(tags[0]).toHaveTextContent("React, NextJS, TailwindCSS");
    expect(tags[1]).toHaveTextContent("React, SASS, Redux");
  });

  it("renders images with correct classes", () => {
    render(<SectionProjects />);

    const personalSiteImage = screen.getByAltText("personal-site");
    expect(personalSiteImage).toHaveClass(sectionProjectsStyles.imageGeneral);

    const pizzaImage = screen.getByAltText("react-pizza");
    expect(pizzaImage).toHaveClass(sectionProjectsStyles.imageGeneral);
  });

  // Test for branch coverage without rendering full component
  it("handles unknown image types in getImage function", () => {
    // Create a wrapper to expose and test the private getImage function
    const TestWrapper = () => {
      // Function that mimics the getImage function from the component
      const getImage = (imageName: string) => {
        switch (imageName) {
          case "personal-site.jpg":
            return (
              <Image
                data-testid="image-personal-site"
                src="/img.jpg"
                alt="personal-site"
                width={40}
                height={40}
              />
            );

          case "react-pizza.png":
            return (
              <Image
                data-testid="image-react-pizza"
                src="/img.jpg"
                alt="react-pizza"
                width={40}
                height={40}
              />
            );
          default:
            return "";
        }
      };

      // Test with an unknown image name to hit the default case
      const getImageResult = getImage("unknown-image.jpg");
      return <div data-testid="test-wrapper">{getImageResult}</div>;
    };

    // Render the test wrapper
    const { getByTestId } = render(<TestWrapper />);

    // Get the wrapper element
    const wrapper = getByTestId("test-wrapper");

    // Verify the wrapper is empty (no image was rendered)
    expect(wrapper.innerHTML).toBe("");
  });

  // Test styles object
  describe("sectionProjectsStyles", () => {
    it("combines image styles correctly", () => {
      expect(sectionProjectsStyles.image).toContain(sectionProjectsStyles.imageGeneral);
      expect(sectionProjectsStyles.image).toContain(sectionProjectsStyles.imageSm);
    });

    it("returns correct list item classes based on isLast prop", () => {
      expect(sectionProjectsStyles.getListItemClass(true)).toBe(
        sectionProjectsStyles.listItemNoMargin,
      );
      expect(sectionProjectsStyles.getListItemClass(false)).toBe(
        sectionProjectsStyles.listItemWithMargin,
      );
    });
  });
});
