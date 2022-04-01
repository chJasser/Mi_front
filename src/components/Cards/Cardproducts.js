import { Input } from "@material-ui/core";
import { Alert } from "@mui/material";
import { setUserLogedIn, userId } from "app/slices/userSlice";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "../../axiosInstance";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectopen } from "app/productslice/Productslice";
import { addProduct } from "app/productslice/Productsliceseller";
// import { format } from 'date-fns';
// components

export default function Cardproducts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [productImage, setimagesfiles] = useState("");
  const validationSchema = Yup.object({
    label: Yup.string()
      .required("label is required")
      .min(4, "label contain 4 charachters at least")
      .max(15, "label contain 15 charachters at most"),
    category: Yup.string().required("Category is required"),
    description: Yup.string()
      .required("Description is required")
      .min(30, "Description must contain at least 30 characters")
      .max(300, "Description must contain at most 300 characters"),
    marque: Yup.string().required("Marque is required"),
    price: Yup.number("Price contains just number ").required(
      "Price is required"
    ),
    reference: Yup.string().required("Reference is required"),
    state: Yup.string().required("Degrees are required"),
    type: Yup.string().required("Type are required"),
  });

  const [selectedOptiontype, setSelectedOptiontype] = useState([]);
  const [selectedOptioncategory, setSelectedOptincategory] = useState([]);
  const [selectedOptionmarque, setSelectedOptionmarque] = useState([]);
  const [selectedOptionstate, setSelectedOptionstate] = useState([]);
  const animatedComponents = makeAnimated();
  const handleInputChangetype = (selectedOptiontype) => {
    setSelectedOptiontype(selectedOptiontype);
  };
  const handleInputChangecategory = (selectedOptioncategory) => {
    setSelectedOptincategory(selectedOptioncategory);
  };

  const handleInputChangestate = (selectedOptionstate) => {
    setSelectedOptionstate(selectedOptionstate);
  };

  const handleInputChangemarque = (selectedOptionmarque) => {
    setSelectedOptionmarque(selectedOptionmarque);
  };

  const optionscategory = [
    { value: "guitars", label: "guitars" },
    { value: "keyboards", label: "keyboards" },
    { value: "strings", label: "strings" },
    { value: "brass", label: "brass" },
    { value: "percussions", label: "percussions" },
    { value: "woodwind", label: "woodwind" },
    { value: "others", label: "others" },
  ];
  const optionstype = [
    { value: "instrument", label: "instrument" },
    { value: "gear", label: "gear" },
  ];
  const optionsmarque = [
    { value: "yamaha", label: "yamaha" },
    { value: "shure", label: "shure" },
    { value: "gibson", label: "gibson" },
    { value: "harman", label: "harman" },
    { value: "fender", label: "fender" },
    { value: "steinway", label: "steinway" },
    { value: "roland", label: "roland" },
    { value: "others", label: "others" },
  ];
  const optionsstate = [
    { value: "new", label: "new" },
    { value: "used", label: "used" },
  ];

  const onSubmit = async (values, { resetForm }) => {
    var formData = new FormData();
    formData.append("label", values.label);
    formData.append("description", values.description);
    formData.append("reference", values.reference);
    formData.append("price", values.price);

    formData.append("category", selectedOptioncategory.value.toString());
    formData.append("marque", selectedOptionmarque.value.toString());
    formData.append("type", selectedOptiontype.value.toString());
    formData.append("state", selectedOptionstate.value.toString());
    for (const key of Object.keys(productImage)) {
      formData.append("files", productImage[key]);
    }
    console.log(values);
    console.log(selectedOptioncategory.value);
    console.log(selectedOptionstate.value);
    console.log(selectedOptiontype.value);
    console.log(selectedOptionmarque.value);
    const response = await axios
      .post("/products/add-product", formData)
      .catch((err) => {
        if (err && err.response) {
          setErrors(err.response.data.message);
          setSuccess(null);
          console.log(err);
        }
      });
    if (response && response.data) {
      // onSubmitProps.resetForm();
      resetForm();
      dispatch(addProduct(response.data.products));
      dispatch(selectopen(false));
      setErrors(null);
      setSuccess(response.data.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          label: "",
          price: "",
          reference: "",
          description: "",
          state: "new",
          type: "gear",
          marque: "yamaha",
          category: "guitars",

          productImage: [],
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Product Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Label
                  </label>
                  <input
                    id="label"
                    name="label"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.label}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {touched.label && errors.label ? (
                    <Alert severity="error">{errors.label}</Alert>
                  ) : null}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {touched.price && errors.price ? (
                    <Alert severity="error">{errors.price}</Alert>
                  ) : null}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Reference
                  </label>
                  <input
                    id="reference"
                    name="reference"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reference}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {touched.reference && errors.reference ? (
                    <Alert severity="error">{errors.reference}</Alert>
                  ) : null}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Category
                  </label>
                  <Select
                    id="category"
                    name="category"
                    value={selectedOptioncategory}
                    onChange={handleInputChangecategory}
                    components={animatedComponents}
                    options={optionscategory}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {touched.category && errors.category ? (
                    <Alert severity="error">{errors.category}</Alert>
                  ) : null}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Marque
                  </label>
                  <Select
                    id="marque"
                    name="marque"
                    value={selectedOptionmarque}
                    onChange={handleInputChangemarque}
                    components={animatedComponents}
                    options={optionsmarque}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {touched.marque && errors.marque ? (
                    <Alert severity="error">{errors.marque}</Alert>
                  ) : null}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Type
                  </label>
                  <Select
                    id="type"
                    name="type"
                    value={selectedOptiontype}
                    onChange={handleInputChangetype}
                    components={animatedComponents}
                    options={optionstype}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {touched.type && errors.type ? (
                    <Alert severity="error">{errors.marque}</Alert>
                  ) : null}
                  <label className="block md:col-span-2"></label>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    State
                  </label>
                  <Select
                    id="state"
                    name="state"
                    value={selectedOptionstate}
                    onChange={handleInputChangestate}
                    components={animatedComponents}
                    options={optionsstate}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {touched.state && errors.state ? (
                    <Alert severity="error">{errors.state}</Alert>
                  ) : null}
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Product Image
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Image
                  </label>
                  <input
                    id="productImage"
                    name="productImage"
                    type="file"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    // defaultValue="City"
                    onChange={(event) => {
                      setFieldValue("productImage", event.currentTarget.files);
                      setimagesfiles(event.target.files);
                    }}
                    multiple
                  />
                  {touched.productImage && errors.productImage ? (
                    <Alert severity="error">{errors.productImage}</Alert>
                  ) : null}
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Product
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    type="text"
                    placeholder="About Product"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                  ></textarea>
                  {touched.description && errors.description ? (
                    <Alert severity="error">{errors.description}</Alert>
                  ) : null}
                </div>
              </div>
            </div>
            <ButtonPrimary type="submit">Save</ButtonPrimary>
          </form>
        )}
      </Formik>
    </div>
  );
}
