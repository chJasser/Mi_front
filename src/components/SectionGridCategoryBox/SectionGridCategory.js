import CardCategory from "components/CardCategory2/CardCategory";
import Heading from "components/Heading/Heading";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory } from "../../app/filterSlice/filterSlice";

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

  const dispatch = useDispatch();
  return (
    <div className={`nc-SectionGridCategoryBox relative`}>
      <Heading
        desc="Discover over 100 Articles"
        className="inline-flex items-center mb-10"
      >
        Instruments
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
        {categories.map((item, index) => (
          <Link
            key={index}
            to={`/mi/archive/the-demo-archive-slug?category=${item}`}
            className="inline-flex items-center"
            onClick={() => dispatch(filterByCategory(item))}
          >
            <CardCategory key={index} category={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategory;
