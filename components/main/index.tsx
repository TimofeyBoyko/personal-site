import { mainStyles } from "./Main.styles";
import type { MainProps } from "./Main.types";

function Main({ children }: MainProps) {
  return <main className={mainStyles.container}>{children}</main>;
}

export default Main;
