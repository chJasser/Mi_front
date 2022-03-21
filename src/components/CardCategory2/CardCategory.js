import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "data/types";
import { Link } from "react-router-dom";
import Badge from "components/Badge/Badge";
import axios from "axiosInstance";
import { useEffect, useState } from "react";

const CardCategory = ({ category }) => {
  const [nbr, setNbrParCategory] = useState(0);
  const [name, setName] = useState("Article");
  const [image, setImage] = useState();
  const base_url = "http://localhost:5050/";
  useEffect(() => {
    axios
      .get(`products/fiter?category=${category}`)
      .then((res) => {
        // console.log(res);
        // console.log(res.data.length);
        if (res.data.length !== 0) {
          setImage(base_url + res.data[0].productImage[0]);
        }
        setName(category);
        setNbrParCategory(res.data.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // const { count, name, href = "/", thumbnail, color } = taxonomy;
  return (
    // <Link
    //   to={href}
    //   className={`nc-CardCategory2 relative flex flex-col items-center justify-center text-center px-3 py-5 sm:p-6  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
    //   data-nc-id="CardCategory2"
    // >
    //    {index && (
    //     <Badge
    //       color={color as TwMainColor}
    //       name={index}
    //       className="absolute -top-2 sm:top-3 left-3"
    //     />
    //   )}
    <div className="text-center">
      <NcImage
        containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`}
        src={image}
      />
      <div className="my-3 ">
        {/* <h2 className={`text-base sm:text-lg font-semibold `}>
          <span className="line-clamp-1">{name}</span>
        </h2> */}

        <span>{name}</span>
        <span
          className={`block mt-[2px] text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {nbr} Articles
        </span>
      </div>
    </div>

    // </Link>
  );
};
export default CardCategory;
