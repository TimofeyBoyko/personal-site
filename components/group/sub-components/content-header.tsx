import { groupStyles } from "../Group.styles";
import type { GroupContentHeaderProps } from "../Group.types";
import IconLink from "./icon-link";

function ContentHeader({
  mainLink,
  contentHeader,
  contentSecondHeader,
  contentSubHeader,
}: GroupContentHeaderProps) {
  return (
    <h3 className={groupStyles.contentHeaderMain}>
      <div>
        <a href={mainLink} target="_blank" className={groupStyles.contentHeaderLink}>
          <span className={groupStyles.contentHeaderLinkSpan} />
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
      {contentSubHeader.map((subHeader) => (
        <div className={groupStyles.contentSubHeader} key={subHeader}>
          {subHeader}
        </div>
      ))}
    </h3>
  );
}

export default ContentHeader;
