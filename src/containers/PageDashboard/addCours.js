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
import * as yup from "yup";
import { Formik } from "formik";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { getCurrentTeacher, login } from "app/slices/userSlice";
import { useHistory } from "react-router-dom";

const AddCours = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [productImage, setimagesfiles] = useState("");

  const validationSchema = yup.object().shape({
    label: yup.string().min(4).max(15).required().trim(),
    description: yup.string().max(255).required().trim(),
    level: yup
      .string()
      .oneOf(["beginner", "intermediate", "advanced"])
      .default("beginner"),
    languages: yup
      .string()
      .oneOf(["english", "french", "arabic"])
      .default("english"),
    price: yup.number().positive().required(),
    duration: yup.number().positive().required(),
    category: yup
      .string()
      .oneOf([
        "voice",
        "guitar",
        "keyboards",
        "strings",
        "percussions",
        "brass",
        "woodwind",
        "others",
      ])
      .default("others"),
  });

  const [selectedOptionlevel, setSelectedOptionlevel] = useState([]);
  const [selectedOptioncategory, setSelectedOptincategory] = useState([]);
  const [selectedOptionlanguages, setSelectedOptionlanguages] = useState([]);
  const [selectedOptionstate, setSelectedOptionstate] = useState([]);
  const animatedComponents = makeAnimated();
  const handleInputChangelevel = (selectedOptionlevel) => {
    setSelectedOptionlevel(selectedOptionlevel);
  };
  const handleInputChangecategory = (selectedOptioncategory) => {
    setSelectedOptincategory(selectedOptioncategory);
  };

  const handleInputChangelanguages = (selectedOptionlanguages) => {
    setSelectedOptionlanguages(selectedOptionlanguages);
  };

  const optionscategory = [
    { value: "voice", label: "voice" },
    { value: "guitar", label: "guitar " },
    { value: "keyboards", label: "keyboards" },
    { value: "strings", label: "strings" },
    { value: "percussions", label: "percussions" },
    { value: "brass", label: "brass" },
    { value: "woodwind", label: "woodwind" },
    { value: "others", label: "others" },
  ];
  const optionslevel = [
    { value: "beginner", label: "beginner" },
    { value: "intermediate", label: "intermediate" },
    { label: "advanced", value: "advanced" },
  ];
  const optionslanguages = [
    { value: "english", label: "english" },
    { value: "french", label: "french" },
    { value: "arabic", label: "arbic" },
  ];

  const onSubmit = async (values) => {
    var formData = new FormData();
    formData.append("label", values.label);
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("price", values.price);

    formData.append("category", selectedOptioncategory.value.toString());
    formData.append("languages", selectedOptionlanguages.value.toString());
    formData.append("level", selectedOptionlevel.value.toString());

    // for (const key of Object.keys(productImage)) {
    //   formData.append("files", productImage[key]);
    // }
    console.log(values);
    console.log(selectedOptioncategory.value);
    console.log(selectedOptionlevel.value);
    console.log(selectedOptionlanguages.value);
    const response = await axios.post("courses/add", formData).catch((err) => {
      if (err && err.response) {
        setErrors(err.response.data.message);
        setSuccess(null);
        console.log(err);
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
          label: "hello",
          price: "",
          duration: "",
          description: "",
          level: "beginner",
          languages: "english",
          category: "others",
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
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <Label>Label</Label>
              <Input
                id="label"
                name="label"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
                placeholder="Example Doe"
                level="text"
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
                level="Number"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                className="mt-1"
                min="0"
              />
            </label>
            {touched.price && errors.price ? (
              <Alert severity="error">{errors.price}</Alert>
            ) : null}
            <label className="block">
              <Label>Duration</Label>
              <Input
                level="text"
                id="duration"
                name="duration"
                className="mt-1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.duration}
                type="number"
                min="0"
              />
            </label>
            {touched.duration && errors.duration ? (
              <Alert severity="error">{errors.duration}</Alert>
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
              <Label> Language</Label>
              <Select
                name="languages"
                id="languages"
                value={selectedOptionlanguages}
                onChange={handleInputChangelanguages}
                components={animatedComponents}
                options={optionslanguages}
              />
            </label>
            {touched.languages && errors.languages ? (
              <Alert severity="error">{errors.languages}</Alert>
            ) : null}
            <label className="block md:col-span-2">
              <Label> Level</Label>
              <Select
                name="level"
                id="level"
                value={selectedOptionlevel}
                onChange={handleInputChangelevel}
                components={animatedComponents}
                options={optionslevel}
              />
            </label>
            {touched.level && errors.level ? (
              <Alert severity="error">{errors.languages}</Alert>
            ) : null}

            <ButtonPrimary className="md:col-span-2" level="submit">
              Add Cours
            </ButtonPrimary>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddCours;
