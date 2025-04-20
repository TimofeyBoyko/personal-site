import React from "react";

import { mainStyles } from "./Main.styles";
import { MainProps } from "./Main.types";

function Main({ children }: MainProps) {
  return <main className={mainStyles.container}>{children}</main>;
}

export default Main;
