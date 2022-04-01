import React, { FC, useState, lazy, useEffect } from "react";
import CourseFeaturedMedia from "components/PostFeaturedMedia/CourseFeaturedMedia";
import Badge from "components/Badge/Badge";
import axios from "axiosInstance";
import ReactStars from "react-rating-stars-component";

export interface Card11Props {
  className?: string;
  course;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11Product: FC<Card11Props> = ({
  className = "h-full",
  course,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const {
    label,
    description,
    category,
    price,
    duration,
    _id,
    level,
    languages,
    CourseImage,
    dateCreation,
    subscribers,
  } = course;
  const [rate, setrating] = useState(0);
  const [myrate, setMyRate] = useState(0);
  const [selectedCourse, SetSelectedCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`rate-course/get-rate/${_id}`)
      .then((value) => setrating(value.data.totalRate))
      .catch((err) => console.log(err));
    axios
      .get(`rate-course/rate/${_id}`)
      .then((value) => setMyRate(value.data.totalRate))
      .catch((err) => console.log(err));
    console.log(myrate);
  }, []);
  useEffect(() => {
    if (myrate !== undefined && myrate !== 0)
      axios
        .post(`rate-course/${_id}/${myrate}`)
        .then(() => console.log("rated "))
        .catch((err) => console.log(err));
  }, [myrate]);

  const date = dateCreation;

  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <CourseFeaturedMedia course={course} isHover={isHover} />
        </div>
      </div>
      {/* <Link
        onClick={() => {
         // getUser(product);
          SetSelectedCourse(course);
        }}
        //to={`/mi/single-gallery/${product._id}`}
        className="absolute inset-0"
      ></Link> */}
      <span className="absolute top-3 inset-x-3">
        <Badge name={category} />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* <PostCardMeta meta={product} /> */}

        <span className="text-xs text-neutral-500">{date}</span>

        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          {label + ":" + price + " $"}
        </h2>
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          {languages + ":" + level}
        </h2>
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          {subscribers + ":" + duration + "h"}
        </h2>
        <div className="flex items-end justify-between mt-auto">
          {`rate:${rate}`}
          {
            <ReactStars
              value={myrate}
              count={5}
              size={24}
              activeColor="#ffd700"
              onChange={(v) => {
                setMyRate(v);
              }}
            ></ReactStars>
          }
        </div>
      </div>
    </div>
  );
};

export default Card11Product;
