import { groupStyles } from "../Group.styles";
import type { GroupHeaderProps } from "../Group.types";

function GroupHeader({ headerText }: GroupHeaderProps) {
  const isImage = typeof headerText !== "string";

  return <header className={groupStyles.getHeaderClasses(isImage)}>{headerText}</header>;
}

export default GroupHeader;
