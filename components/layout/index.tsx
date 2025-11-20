import { layoutStyles } from "./Layout.styles";
import type { LayoutProps } from "./Layout.types";

function Layout({ children }: LayoutProps) {
  return <div className={layoutStyles.container}>{children}</div>;
}

export default Layout;
