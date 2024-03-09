import React from "react";

import TagsList from "../tags-list";

import GroupHeader, { GroupHeaderProps } from "./sub-components/header";
import ContentHeader, {
  GroupContentHeaderProps,
} from "./sub-components/content-header";

type GroupProps = {
  content: string;
  tags: string[];
} & GroupContentHeaderProps &
  GroupHeaderProps;

function Group({
  headerText,
  mainLink,
  contentHeader,
  contentSecondHeader,
  contentSubHeader,
  content,
  tags,
}: GroupProps) {
  return (
    <div className="group relative grid pb-1 transition-all mobile:grid-cols-8 mobile:gap-8 tablet:gap-4 tablet:hover:!opacity-100 tablet:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none tablet:-inset-x-6 tablet:block tablet:group-hover:bg-slate-800/50 tablet:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] tablet:group-hover:drop-shadow-lg"></div>
      <GroupHeader headerText={headerText} />

      <div className="z-10 mobile:col-span-6">
        <ContentHeader
          mainLink={mainLink}
          contentHeader={contentHeader}
          contentSecondHeader={contentSecondHeader}
          contentSubHeader={contentSubHeader}
        />
        <p className="mt-2 text-sm leading-normal">{content}</p>
        <TagsList tags={tags} />
      </div>
    </div>
  );
}

export default Group;
