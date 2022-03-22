import React, { useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import LayoutPage from "components/LayoutPage/LayoutPage";
import SocialsList from "components/SocialsList/SocialsList";
import Textarea from "components/Textarea/Textarea";
import { Helmet } from "react-helmet";
import axios from "../../axiosInstance";
import { Alert } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { getCurrentTeacher, login } from "app/slices/userSlice";
import { useHistory } from "react-router-dom";

const Addproducts = () => {
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

  const onSubmit = async (values) => {
    var formData = new FormData();
    formData.append("label", values.label);
    formData.append("description", values.description);
    formData.append("reference", values.reference);
    formData.append("price", values.price);

    formData.append("category", selectedOptioncategory.value);
    formData.append("marque", selectedOptionmarque.value);
    formData.append("type", selectedOptiontype.value);
    formData.append("state", selectedOptionstate.value);
    for (const key of Object.keys(productImage)) {
      formData.append("files", productImage[key]);
    }
    console.log(values);
    console.log(selectedOptioncategory.value);
    console.log(selectedOptionstate.value);
    const response = await axios
      .post("/products/add-product", formData)
      .catch((err) => {
        if (err && err.response) {
          setErrors(err.response.data.message);
          setSuccess(null);
        }
      });
    if (response && response.data) {
      setErrors(null);
      setSuccess(response.data.message);

      history.push("/dashboard");
    }
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <Formik
        initialValues={{
          label: "",
          price: "",
          reference: "",
          description: "",
          productImage: [],
        }}
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
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <Label>Label</Label>
              <Input
                id="label"
                name="label"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
                placeholder="Example Doe"
                type="text"
                className="mt-1"
              />
            </label>
            {touched.label && errors.label ? (
              <Alert severity="error">{errors.label}</Alert>
            ) : null}

            <label className="block">
              <Label>Price</Label>
              <Input
                id="price"
                name="price"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                className="mt-1"
              />
            </label>
            {touched.price && errors.price ? (
              <Alert severity="error">{errors.price}</Alert>
            ) : null}
            <label className="block">
              <Label>Reference</Label>
              <Input
                type="text"
                id="reference"
                name="reference"
                className="mt-1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reference}
              />
            </label>
            {touched.reference && errors.reference ? (
              <Alert severity="error">{errors.reference}</Alert>
            ) : null}
            <label className="block">
              <Label>Description</Label>
              <Textarea
                id="description"
                name="description"
                className="mt-1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                rows={6}
              />
            </label>
            {touched.description && errors.description ? (
              <Alert severity="error">{errors.description}</Alert>
            ) : null}
            <label className="block md:col-span-2">
              <Label> Category</Label>
              <Select
                name="category"
                id="category"
                value={selectedOptioncategory}
                onChange={handleInputChangecategory}
                components={animatedComponents}
                options={optionscategory}
              />
            </label>
            {touched.category && errors.category ? (
              <Alert severity="error">{errors.category}</Alert>
            ) : null}

            <label className="block md:col-span-2">
              <Label> Marque</Label>
              <Select
                name="marque"
                id="marque"
                value={selectedOptionmarque}
                onChange={handleInputChangemarque}
                components={animatedComponents}
                options={optionsmarque}
              />
            </label>
            {touched.marque && errors.marque ? (
              <Alert severity="error">{errors.marque}</Alert>
            ) : null}
            <label className="block md:col-span-2">
              <Label> Type</Label>
              <Select
                name="type"
                id="type"
                value={selectedOptiontype}
                onChange={handleInputChangetype}
                components={animatedComponents}
                options={optionstype}
              />
            </label>
            {touched.type && errors.type ? (
              <Alert severity="error">{errors.marque}</Alert>
            ) : null}
            <label className="block md:col-span-2">
              <Label> State</Label>
              <Select
                name="state"
                id="state"
                value={selectedOptionstate}
                onChange={handleInputChangestate}
                components={animatedComponents}
                options={optionsstate}
              />
            </label>
            {touched.state && errors.state ? (
              <Alert severity="error">{errors.state}</Alert>
            ) : null}

            <Input
              id="productImage"
              name="productImage"
              type="file"
              className="mt-1 form-control form-control-sm"
              style={{ border: "1px solid #D1D1D1" }}
              onChange={(event) => {
                setFieldValue("productImage", event.currentTarget.files);
                setimagesfiles(event.target.files);
              }}
              multiple
            />
            {touched.productImage && errors.productImage ? (
              <Alert severity="error">{errors.productImage}</Alert>
            ) : null}

            <ButtonPrimary className="md:col-span-2" type="submit">
              Add product
            </ButtonPrimary>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Addproducts;