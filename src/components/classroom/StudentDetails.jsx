import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import {
  setIsOpen,
  setIsOpenResource,
  setIsOpenChapter,
} from "app/slices/modalSlice";
import CourseMoadal from "./CourseMoadal";
import axios from "axiosInstance";
import CourseContent from "./courseContent";
import { setChange, setSelected, setChapter } from "app/slices/courseSlice";
import UpdateChapterMoadal from "./UpdateChapterModel";
import CourseContentStudent from "./courseContentStudent";

function StudentDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const [chapters, setChapters] = useState([]);
  const selected = useSelector((state) => state.courseSlice.selected);
  const chapter = useSelector((state) => state.courseSlice.chapter);
  const change = useSelector((state) => state.courseSlice.change);
  const [course, setCourse] = useState({ label: "", description: "" });

  useEffect(
    () =>
      axios.get(`/courses/get-course/${params.id}`).then((ch) => {
        dispatch(setSelected(ch.data));
        setCourse(ch.data);
      }),
    []
  );
  useEffect(
    () => axios.get(`chapters/${params.id}`).then((ch) => setChapters(ch.data)),
    [course, change]
  );
  useEffect(() => {
    console.log(chapters);
  });
  const isOpen = useSelector((state) => state.CoursemodalSlice.isOpen);
  const [tabActive, setTabActive] = useState(chapters[0]);

  const handleClickTab = (item) => {
    if (item === tabActive) {
      return;
    }
    dispatch(setChapter(item));
    setTabActive(item);
  };
  return (
    <div className={"container-fluid"}>
      <Helmet>
        <title>Courses{course.label}</title>
      </Helmet>
      <div className="flex flex-no-wrap">
        {/* Sidebar starts */}
        {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
        <div className=" absolute sm:relative  shadow md:h-full flex-col justify-between flex">
          <div className="px-8">
            <ul className="mt-12">
              <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-book"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                  </svg>
                  <span className="text-sm  mx-2">Chapters</span>
                </div>
              </li>
              {chapters.map((item, index) => (
                <li
                  className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6"
                  onClick={() => handleClickTab(item)}
                  key={index}
                >
                  <div className="flex items-center">
                    <span className="text-sm  ml-2">{item.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Sidebar ends */}
        {/* Remove class [ h-64 ] when adding a card block */}
        <div className="container mx-auto py-10  ">
          {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
          <div className="w-full h-full rounded ">
            {/* Place your content here */}
            <CourseContentStudent course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
