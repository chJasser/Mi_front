import { useSelector, useDispatch } from "react-redux";
import { setIsOpenResource, setIsOpenUpResource } from "app/slices/modalSlice";
import ResourceMoadal from "./ResourceModel";
import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import ReactPlayer from "react-player";
import NcImage from "components/NcImage/NcImage";
import ReactAudioPlayer from "react-audio-player";
import {
  setChangeResource,
  setSelectedResource,
} from "app/slices/courseSlice.js";
import { Document, Page, pdfjs } from "react-pdf";
import UpdateResourceMoadal from "./updateResourceModal";
function CourseContent({ course }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const dispatch = useDispatch();
  const change = useSelector((state) => state.courseSlice.changeResource);
  const [resources, setResources] = useState([]);
  const selected = useSelector((state) => state.courseSlice.selectedCourse);
  const chapter = useSelector((state) => state.courseSlice.chapter);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const base_url = "http://localhost:5050/data/resources/";
  const deleteResource = (resource) => {
    axios
      .delete(`/resources/${resource._id}`)
      .then(() => {
        dispatch(setChangeResource());
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (chapter._id !== 0)
      axios
        .get(`/resources/${chapter._id}`)
        .then((data) => {
          setResources(data.data);
        })
        .catch((err) => console.log(err));
  }, [chapter, change]);
  return (
    <div className="container-fluid">
      <h1 className="text-center">{selected.label}</h1>
      <span>{selected.description}</span>
      <h2>{chapter.title}</h2>
      <span>{chapter.description}</span>
      <br />
      {chapter._id !== 0 && (
        <button
          onClick={() => {
            dispatch(setIsOpenResource(true));
          }}
        >
          addResource
        </button>
      )}
      {chapter._id !== 0 && (
        <>
          {resources.map((resource, index) => (
            <div key={index}>
              {resource.title}
              <button
                title="Edit"
                style={{ color: "#FFC107" }}
                onClick={() => {
                  dispatch(setSelectedResource(resource));
                  dispatch(setIsOpenUpResource(true));
                }}
              >
                <i className="material-icons">&#xE254;</i>
              </button>
              <button
                title="Delete"
                style={{ color: "#E34724" }}
                onClick={() => {
                  deleteResource(resource);
                }}
              >
                <i className="material-icons ">&#xE872;</i>
              </button>
              <>
                {resource.type.startsWith("video") && (
                  <ReactPlayer
                    url={base_url + resource.path}
                    className="video inset-0"
                    style={{ borderRadius: 18, overflow: "hidden" }}
                    controls
                  ></ReactPlayer>
                )}
                {resource.type.startsWith("image") && (
                  <NcImage
                    className="h-400 w-400"
                    src={`${base_url + resource.path}`}
                    alt={resource.title}
                  />
                )}
                {resource.type.startsWith("audio") && (
                  <ReactAudioPlayer
                    className="w-90 h-90"
                    src={`${base_url + resource.path}`}
                    controls
                    // other props here
                  />
                )}
                {resource.type === "application/pdf" && (
                  <>
                    <br />
                    <a
                      href={base_url + resource.path}
                      target="_blank"
                      rel="noreferrer"
                    >
                      view Pdf
                    </a>
                  </>
                )}
              </>
              {resource.description}
            </div>
          ))}
        </>
      )}
      <UpdateResourceMoadal></UpdateResourceMoadal>
      <ResourceMoadal />
    </div>
  );
}

export default CourseContent;
