"use client";

import React from "react";

type TNavigationItem = {
  label: string;
  href: string;
  isActive: boolean;
};

function Navigation() {
  const [items, setItems] = React.useState<TNavigationItem[]>([]);

  React.useEffect(() => {
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

    const onScroll = () => {
      let alreadyActive = false;

      const newData = data.map((d, index) => {
        const clientRect = document
          .getElementById(d.href.replace("#", ""))
          ?.getBoundingClientRect();

        if (alreadyActive) return { ...d };

        alreadyActive =
          (clientRect && clientRect.top > 0) || index === data.length - 1
            ? true
            : false;

        return { ...d, isActive: alreadyActive };
      });

      setItems([...newData]);
    };

    const scroll = document.getElementsByClassName(
      "custom-scrollbar__content",
    )[0];

    scroll?.addEventListener("scroll", onScroll);

    setItems([...data]);

    return () => {
      scroll?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="hidden tablet:block">
      <ul className="mt-16 w-max">
        {items.map((item) => {
          return (
            <li key={item.href}>
              <a
                className={`${item.isActive ? "active " : ""}group flex items-center py-3`}
                href={item.href}
              >
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
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
