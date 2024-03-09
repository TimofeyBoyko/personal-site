import React from "react";
import Tag from "../tag";

type TagsListProps = {
  tags: string[];
};
function TagsList({ tags }: TagsListProps) {
  return (
    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
      {tags.map((tag) => {
        return (
          <li key={tag} className="mr-1.5 mt-2">
            <Tag label={tag} />
          </li>
        );
      })}
    </ul>
  );
}

export default TagsList;
