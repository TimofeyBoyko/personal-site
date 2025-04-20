import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Layout from "./";

describe("Layout", () => {
  it("renders children properly", () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Child Content</div>
      </Layout>,
    );

    const childElement = screen.getByTestId("test-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Test Child Content");
  });

  it("applies the correct classes", () => {
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );

    // Check that the container has the expected classes
    const container = screen.getByText("Test Child").parentElement;
    expect(container).toHaveClass("mx-auto");
    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("min-h-screen");
  });
});
