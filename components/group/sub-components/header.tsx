import React from "react";

export type GroupHeaderProps = { headerText: string | React.ReactNode };

function GroupHeader({ headerText }: GroupHeaderProps) {
  const isImage = typeof headerText !== "string";

  return (
    <header
      className={`${isImage ? "hidden  " : ""} z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 mobile:col-span-2 mobile:inline`}
    >
      {headerText}
    </header>
  );
}

export default GroupHeader;
