import React from "react";

import TagsList from "./sub-components/tags-list";
import GroupHeader from "./sub-components/header";
import ContentHeader from "./sub-components/content-header";

import { groupStyles } from "./Group.styles";
import { GroupProps } from "./Group.types";

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
    <div className={groupStyles.container}>
      <div data-testid="hover-effect" className={groupStyles.hoverEffect}></div>
      <GroupHeader headerText={headerText} />

      <div className={groupStyles.contentContainer}>
        <ContentHeader
          mainLink={mainLink}
          contentHeader={contentHeader}
          contentSecondHeader={contentSecondHeader}
          contentSubHeader={contentSubHeader}
        />
        <p className={groupStyles.contentText}>{content}</p>
        <TagsList tags={tags} />
      </div>
    </div>
  );
}

export default Group;
