import React from "react";
import GitHubSvg from "../../public/github.svg";

import data from "@/data/social.json";

function Social() {
  const getIcon = (item: { name: string; link: string }) => {
    if (item.name === "Github") return <GitHubSvg className="h-6 w-6" />;
  };

  return (
    <ul className="ml-1 mt-8 flex items-center">
      {data.items.map((item) => {
        const icon = getIcon(item);
        return (
          <li className="mr-5 shrink-0 text-xs" key={item.name}>
            <a
              className="block hover:text-slate-200"
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
