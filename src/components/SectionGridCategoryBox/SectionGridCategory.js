import CardCategory from "components/CardCategory2/CardCategory";
import Heading from "components/Heading/Heading";
import React from "react";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {filterByCategory} from "../../app/filterSlice/filterSlice"

// export interface SectionGridCategoryBoxProps {
//   categories?: TaxonomyType[];
//   headingCenter?: boolean;
//   categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
//   className?: string;
// }

//const DATA = DEMO_CATEGORIES.filter((_, i) => i < 10);


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
  //let CardComponentName = CardCategory;
  // switch (categoryCardType) {
  //   case "card1":
  //     CardComponentName = CardCategory1;
  //     break;
  //   case "card2":
  //     CardComponentName = CardCategory2;
  //     break;
  //   case "card3":
  //     CardComponentName = CardCategory3;
  //     break;
  //   case "card4":
  //     CardComponentName = CardCategory4;
  //     break;
  //   case "card5":
  //     CardComponentName = CardCategory5;
  //     break;

  //   default:
  //     CardComponentName = CardCategory1;
  // }
  const dispatch = useDispatch();
  return (
    <div className={`nc-SectionGridCategoryBox relative `}>
      <Heading desc="Discover over 100 Articles" >
        Instruments
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
        {categories.map((item, i) => (
          <a 
          //href ={`/archive/the-demo-archive-slug?category=${item}`}
          onClick={() => dispatch(filterByCategory(item))}>
            <CardCategory
            key={i}
            category={item}
          />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategory;
