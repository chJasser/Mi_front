import CardCategory from "components/CardCategory2/CardCategory";
import Heading from "components/Heading/Heading";
import React from "react";
import { Link } from "react-router-dom";

const SectionGridCategory = () => {
  let categories = [
    "guitars",
    "keyboards",
    "strings",
    "brass",
    "percussions",
    "woodwind",
    "others",
  ];

  return (
    <div className={`nc-SectionGridCategoryBox relative `}>
      <Heading desc="Discover over 100 Articles">Instruments</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
        {categories.map((item, i) => (
          <a href={`/archive/the-demo-archive-slug?category=${item}`}>
            <CardCategory key={item} category={item} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategory;
