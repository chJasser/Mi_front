import React from "react";
import Teachertable from "./Teachertable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setIsOpen } from "app/slices/modalSlice";
import CourseMoadal from "./CourseMoadal";
function TeacherClassroom() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.CoursemodalSlice.isOpen);
  return (
    <div key="modalCourse">
      <CourseMoadal></CourseMoadal>
      <div className="min-h-screen  text-gray-900 ">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            <div className=" flex items-center justify-between ">
              <div>
                <h2 className="text-gray-600 font-semibold">My Courses</h2>
              </div>
              <button
                type="button"
                className="btn btn-info add-new"
                onClick={() => dispatch(setIsOpen(true))}
              >
                <i className="fa fa-plus"></i> Add New
              </button>
              <div className="flex items-center justify-between">
                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="bg-gray-50 outline-none ml-1 block "
                    type="text"
                    name=""
                    id=""
                    placeholder="search..."
                  />
                </div>
              </div>
            </div>
            <Teachertable></Teachertable>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherClassroom;
