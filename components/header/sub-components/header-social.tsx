import React from "react";

import GitHubSvg from "../../../public/github.svg";
import LinkedInSvg from "../../../public/linkedin.svg";
import TelegramSvg from "../../../public/telegram.svg";

import { headerStyles } from "../Header.styles";
import { SocialItemType } from "../Header.types";

import data from "@/data/social.json";

function Social() {
  const getIcon = (item: SocialItemType) => {
    if (item.name === "Github") return <GitHubSvg className="h-6 w-6" data-testid="github-svg" />;
    if (item.name === "LinkedIn") return <LinkedInSvg className="h-6 w-6" data-testid="linkedin-svg" />;
    if (item.name === "Telegram") return <TelegramSvg className="h-6 w-6" data-testid="telegram-svg" />;
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
              <span className="sr-only">{item.name}</span>
              {icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Social;
