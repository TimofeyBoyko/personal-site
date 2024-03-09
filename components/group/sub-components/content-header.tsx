import IconLink from "@/components/icon-link";
import React from "react";

export type GroupContentHeaderProps = {
  mainLink: string;
  contentHeader: string;
  contentSecondHeader: string;
  contentSubHeader: string[];
};

function ContentHeader({
  mainLink,
  contentHeader,
  contentSecondHeader,
  contentSubHeader,
}: GroupContentHeaderProps) {
  return (
    <h3 className="font-medium leading-snug text-slate-200">
      <div>
        <a
          href={mainLink}
          target="_blank"
          className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200  hover:text-teal-300 focus-visible:text-teal-300"
        >
          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded tablet:-inset-x-6 tablet:-inset-y-4 tablet:block"></span>
          <span>
            {contentHeader}
            {contentSecondHeader ? " · " : ""}
            <span className="inline-block">
              {contentSecondHeader}
              <IconLink />
            </span>
          </span>
        </a>
      </div>
      {contentSubHeader.map((subHeader) => {
        return (
          <div className="text-slate-500" key={subHeader}>
            {subHeader}
          </div>
        );
      })}
    </h3>
  );
}

export default ContentHeader;
