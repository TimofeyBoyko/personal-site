"use client";

import React from "react";

import { headerStyles } from "../Header.styles";
import type { NavigationItemType } from "../Header.types";

const data = [
  {
    label: "about",
    href: "#about",
    isActive: true,
  },
  {
    label: "experience",
    href: "#experience",
    isActive: false,
  },
  {
    label: "projects",
    href: "#projects",
    isActive: false,
  },
];

function Navigation() {
  const [items, setItems] = React.useState<NavigationItemType[]>(data);

  React.useEffect(() => {
    const onScroll = () => {
      let alreadyActive = false;

      const newData = data.map((d, index) => {
        const clientRect = document
          .getElementById(d.href.replace("#", ""))
          ?.getBoundingClientRect();

        if (alreadyActive) return { ...d };

        alreadyActive = !!((clientRect && clientRect.top > 0) || index === data.length - 1);

        return { ...d, isActive: alreadyActive };
      });

      setItems([...newData]);
    };

    const scroll = document.getElementsByClassName("custom-scrollbar__content")[0];

    scroll?.addEventListener("scroll", onScroll);

    setItems([...data]);

    return () => {
      scroll?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className={headerStyles.navigationContainer} data-testid="navigation-container">
      <ul className={headerStyles.navigationList} data-testid="navigation-list">
        {items.map((item) => {
          return (
            <li key={item.href}>
              <a
                className={headerStyles.navigationItem}
                href={item.href}
                data-testid={`nav-link-${item.label}`}
                aria-current={item.isActive ? "page" : undefined}
              >
                <span
                  className={
                    item.isActive
                      ? headerStyles.navigationIndicatorActive
                      : headerStyles.navigationIndicator
                  }
                />
                <span
                  className={
                    item.isActive ? headerStyles.navigationTextActive : headerStyles.navigationText
                  }
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
