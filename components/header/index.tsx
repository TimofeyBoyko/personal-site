import React from "react";

import Info from "../header-info";
import Navigation from "../header-navigation";
import Social from "../header-social";

function Header({}: {}) {
  return (
    <div className="py-12 tablet:sticky tablet:top-0 tablet:flex tablet:max-h-screen tablet:w-1/2 tablet:flex-col tablet:justify-between tablet:py-24">
      <div>
        <Info />
        <Navigation />
      </div>

      <Social />
    </div>
  );
}

export default Header;
