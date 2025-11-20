import { groupStyles } from "../Group.styles";
import type { TagProps } from "../Group.types";

function Tag({ label }: TagProps) {
  return (
    <div className={groupStyles.tag} data-testid="tag">
      {label}
    </div>
  );
}

export default Tag;
