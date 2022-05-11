import { PostDataType } from "data/types";
import React, { FC } from "react";
import Badge from "components/Badge/Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: PostDataType["categories"];
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      <Badge
        className={itemClass}
        name={"Audio"}
        color={"blue"}
        href="/mi/classroom/teacher/details/6254c543ee9fe5bb0d47bfe6"
      />
    </div>
  );
};

export default CategoryBadgeList;
