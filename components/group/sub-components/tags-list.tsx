import { groupStyles } from "../Group.styles";
import type { TagsListProps } from "../Group.types";
import Tag from "./tag";

function TagsList({ tags }: TagsListProps) {
  return (
    <ul
      className={groupStyles.tagsListContainer}
      aria-label="Technologies used:"
      data-testid="tags-list"
    >
      {tags.map((tag) => {
        return (
          <li key={tag} className={groupStyles.tagsListItem}>
            <Tag label={tag} />
          </li>
        );
      })}
    </ul>
  );
}

export default TagsList;
