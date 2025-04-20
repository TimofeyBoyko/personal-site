import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { mainStyles } from "./Main.styles";
import Main from "./index";

describe("Main", () => {
  it("renders children correctly", () => {
    render(
      <Main>
        <div data-testid="test-child-1">Test Child 1</div>
        <div data-testid="test-child-2">Test Child 2</div>
      </Main>,
    );

    // Check that children are rendered
    expect(screen.getByTestId("test-child-1")).toBeInTheDocument();
    expect(screen.getByTestId("test-child-2")).toBeInTheDocument();
  });

  it("applies container styling", () => {
    render(
      <Main>
        <div>Child Content</div>
      </Main>,
    );

    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass(mainStyles.container);
  });

  // Test mainStyles object
  describe("mainStyles", () => {
    // Test container styles
    describe("container styles", () => {
      it("includes general styles", () => {
        expect(mainStyles.container).toContain(mainStyles.mainGeneral);
      });

      it("includes lg breakpoint styles", () => {
        expect(mainStyles.container).toContain(mainStyles.mainLg);
      });

      it("combines all required styles", () => {
        const expectedCombination = [mainStyles.mainGeneral, mainStyles.mainLg]
          .filter(Boolean)
          .join(" ");

        expect(mainStyles.container).toBe(expectedCombination);
      });
    });

    // Test individual style properties
    describe("style properties", () => {
      it("has correct general styles", () => {
        expect(mainStyles.mainGeneral).toContain("pt-0");
      });

      it("has correct lg breakpoint styles", () => {
        expect(mainStyles.mainLg).toContain("lg:w-1/2");
        expect(mainStyles.mainLg).toContain("lg:py-24");
      });
    });
  });
});
