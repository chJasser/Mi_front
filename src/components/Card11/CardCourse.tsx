import { FC, useState, lazy, useEffect } from "react";
import CourseFeaturedMedia from "components/PostFeaturedMedia/CourseFeaturedMedia";
import Badge from "components/Badge/Badge";
import axios from "axiosInstance";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/store";
import { setSub } from "app/slices/sub";

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
    students,
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
    teacher,
  } = course;
  const dispatch = useDispatch();
  const sub = useSelector((state: RootState) => state.sub.subscribe);
  const [rate, setrate] = useState({ totalRate: 0, myrate: 0 });
  const [change, setChange] = useState(0);
  const currentteacher = useSelector(
    (state: RootState) => state.user.currentTeacher
  );
  const student = useSelector((state: RootState) => state.user.currentStudent);
  const subscribe = () => {
    axios
      .put(`courses/subscribe-course/${_id}`, null)

      .catch((err) => console.log(err));
  };
  const unsubscribe = () => {
    axios
      .put(`courses/unsubscribe-course/${_id}`, null)

      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get(`rate-course/${_id}`)
      .then((value) => {
        setrate({ ...value.data });
      })
      .catch((err) => console.log(err));
  });
  useEffect(() => {
    if (change !== undefined && change !== 0)
      axios
        .post(`rate-course/${_id}/${change}`)
        .catch((err) => console.log(err));
  }, [change]);

  const date = dateCreation;

  const [isHover, setIsHover] = useState(false);

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
          {`rate:${rate.totalRate}`}
          {
            <ReactStars
              key={"star" + rate.myrate + ":" + _id}
              value={rate.myrate}
              count={5}
              size={24}
              activeColor="#ffd700"
              onChange={(v) => {
                setChange(v);
              }}
            ></ReactStars>
          }
        </div>
        <div className="flex items-end justify-between mt-auto">
          {((!students.includes(student._id) && sub === null) ||
            sub === true) && (
            <button
              onClick={() => {
                dispatch(setSub(false));
                unsubscribe();
              }}
            >
              unsubscribe
            </button>
          )}
          {teacher === currentteacher._id && <label>your course</label>}
          {((!students.includes(student._id) && sub === null) ||
            sub === false) && (
            <button
              onClick={() => {
                subscribe();
                dispatch(setSub(true));
              }}
            >
              subscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card11Product;