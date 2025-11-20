import data from "@/data/personal.json";

import { headerStyles } from "../Header.styles";

function Info() {
  return (
    <>
      <h1 className={headerStyles.infoTitle} data-testid="info-title">
        {data.name}
      </h1>
      <h2 className={headerStyles.infoSubtitle} data-testid="info-subtitle">
        {data.currentRole}
      </h2>
      <p className={headerStyles.infoDescription} data-testid="info-description">
        {data.description}
      </p>
    </>
  );
}

export default Info;
