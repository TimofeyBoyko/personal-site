import React from "react";
import { headerStyles } from "./Header.styles";
import { HeaderProps } from "./Header.types";

import Info from "./sub-components/header-info";
import Navigation from "./sub-components/header-navigation";
import Social from "./sub-components/header-social";

function Header({}: HeaderProps) {
  return (
    <div className={headerStyles.container} data-testid="header-container">
      <div data-testid="header-top-section">
        <Info />
        <Navigation />
      </div>

      <Social />
    </div>
  );
}

export default Header;
