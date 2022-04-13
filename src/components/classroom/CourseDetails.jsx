import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import NavItem from "components/NavItem/NavItem";
import { useState, useEffect } from "react";
import { setIsOpen } from "app/slices/modalSlice";
import CourseMoadal from "./CourseMoadal";
import axios from "axiosInstance";

function CourseDetails() {
  const dispatch = useDispatch();
  const [chapters, setChapters] = useState([]);
  const selected = useSelector((state) => state.courseSlice.selected);
  useEffect(
    () =>
      axios.get(`chapters/${course._id}`).then((ch) => setChapters(ch.data)),
    []
  );
  const isOpen = useSelector((state) => state.CoursemodalSlice.isOpen);
  const [tabActive, setTabActive] = useState(chapters[0]);

  const handleClickTab = (item) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  const course = useSelector((state) => state.courseSlice.selectedCourse);
  return (
    <div className={`nc-PageSearchV2 `} data-nc-id="PageSearchV2">
      <Helmet>
        <title>Courses{course.label}</title>
      </Helmet>
      <div className="container ">
        <nav
          className={`nc-Nav w-full overflow-x-auto hiddenScrollbar p-2`}
          data-nc-id="Nav"
        >
          <ul className={`flex-column  sm:space-x-2`}>
            <NavItem
              isActive={true}
              onClick={() => {
                dispatch(setIsOpen(true));
              }}
            >
              <i className="fa fa-plus" style={{ marginRight: "4px" }}></i> Add
              new chapter
            </NavItem>
            <br></br>
            {chapters.map((item, index) => (
              <NavItem
                key={index}
                isActive={tabActive === item}
                onClick={() => handleClickTab(item)}
              >
                {item.title}
              </NavItem>
            ))}
          </ul>
        </nav>
        <div className="text-center">{course.label}</div>
      </div>

      <CourseMoadal />
    </div>
  );
}

export default CourseDetails;
