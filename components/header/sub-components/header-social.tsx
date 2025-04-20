import React from "react";
import GitHubSvg from "../../../public/github.svg";
import { headerStyles } from "../Header.styles";
import { SocialItemType } from "../Header.types";

import data from "@/data/social.json";

function Social() {
  const getIcon = (item: SocialItemType) => {
    if (item.name === "Github") return <GitHubSvg className="h-6 w-6" />;
    return null;
  };

  return (
    <ul className={headerStyles.socialList} data-testid="social-list">
      {data.items.map((item) => {
        const icon = getIcon(item);
        return (
          <li
            className={headerStyles.socialItem}
            key={item.name}
            data-testid={`social-item-${item.name}`}
          >
            <a
              className={headerStyles.socialLink}
              href={item.link}
              target="_blank"
              title={item.name}
            >
              <span className="sr-only">GitHub</span>
              {icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Social;
