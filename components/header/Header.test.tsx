import { render, screen } from "@testing-library/react";

// Mock sub-components for Header tests
vi.mock("./sub-components/header-info", () => ({
  __esModule: true,
  default: () => <div data-testid="header-info">Header Info Component</div>,
}));

vi.mock("./sub-components/header-navigation", () => ({
  __esModule: true,
  default: () => <div data-testid="header-navigation">Navigation Component</div>,
}));

vi.mock("./sub-components/header-social", () => ({
  __esModule: true,
  default: () => <div data-testid="header-social">Social Component</div>,
}));

import { headerStyles } from "./Header.styles";
import Header from "./index";

describe("Header Component", () => {
  it("renders correctly with all sub-components", () => {
    render(<Header />);

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

    const headerFirstChild = container.firstChild?.firstChild;

    expect(headerFirstChild?.firstChild).toHaveAttribute("data-testid", "header-info");
    expect(headerFirstChild?.lastChild).toHaveAttribute("data-testid", "header-navigation");
  });

  it("renders Social separate from Info and Navigation", () => {
    const { container } = render(<Header />);

    const headerLastChild = container.firstChild?.lastChild;

    expect(headerLastChild).toHaveAttribute("data-testid", "header-social");
  });
});
