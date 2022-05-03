import { Helmet } from "react-helmet";

import image from "images/dance.jpg";
import { useSelector } from "react-redux";
import axios from "axiosInstance";

import NcImage from "components/NcImage/NcImage";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
/**
 *
 *
 *
 */
function Meet() {
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const id = Math.random().toString(36).substring(2, 7);
  const [room, setRoom] = useState(null);

  const getToekn = async () => {
    const response = await axios.post(`create-token/${id}`);
    if (response.data.status) {
      setRoom(id);
      setToken(response.data.token);
    }
  };
  const createRoom = async () => {
    if (token != null) {
      history.push(`/mi/meet/${room}/${token}`);
    }
  };
  useEffect(() => {
    getToekn();
  }, []);
  const onSubmit = (values) => {
    const data = {
      email: values.email,
      name: userName,
      token: token,
      room: room,
    };
    axios
      .post("/karaokeinvi", data)
      .then((response) => {
        setErrors(null);
        formik.resetForm();
        setSuccess(response.data.message);
        setTimeout(() => {
          setSuccess("");
        }, 1500);
      })
      .catch((err) => {
        setErrors(err.response.data.message);
        setSuccess(null);
        setTimeout(() => {
          setErrors("");
        }, 1500);
      });
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  });
  let className = "";
  const history = useHistory();
  const userName = useSelector((state) => state.user.userLogedIn.firstName);
  return (
    <>
      <div
        style={{ marginBottom: "20px" }}
        className={`nc - PageSearch ${className}`}
        data-nc-id="PageSearch"
      >
        <Helmet>
          <title>MI || Classroom</title>
        </Helmet>

        {/* ====================== END HEADER ====================== */}
      </div>

      <div className="container mt-20 grid grid-cols-2 gap-4 mb-10">
        <div className="block p-6  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Join room
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            To join a room please past the url .
          </p>
          <label
            htmlFor="email-adress-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Room url
          </label>
          <div className="relative">
            <input
              type="text"
              id="email-adress-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://miuniverse.daily.co/"
            />
          </div>
          <button
            style={{ backgroundColor: "#1976D2" }}
            className="mt-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Join room
          </button>
        </div>
      </div>
    </>
  );
}

export default Meet;
