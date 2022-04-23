import React, { useState ,Fragment} from "react";
import { createPopper } from "@popperjs/core";
import axios from "axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { Alert } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import Textarea from "components/Textarea/Textarea";
import {
  deletesellerProduct,
  addProduct,
  selectsellerProduct,
  populatesellerProducts,
  showForm,
} from "app/productslice/Productsliceseller";

const ProductManagement = (props) => {
  const [onDeleted, setOnDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const { id, product } = props;
  const dispatch = useDispatch();
  // dropdown props
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

  //const product = useSelector((state) => state.productseller.selectedProduct);
  
  const [selectedOptiontype, setSelectedOptiontype] = useState(product.type);
  const [selectedOptioncategory, setSelectedOptincategory] = useState(
    product.category
  );
  const [selectedOptionmarque, setSelectedOptionmarque] = useState(
    product.marque
  );
  const [selectedOptionstate, setSelectedOptionstate] = useState(product.state);
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

    formData.append(
      "category",
      selectedOptioncategory.value
        ? selectedOptioncategory.value
        : product.category
    );
    formData.append(
      "marque",
      selectedOptionmarque.value ? selectedOptionmarque.value : product.marque
    );
    formData.append(
      "type",
      selectedOptiontype.value ? selectedOptiontype.value : product.type
    );
    formData.append(
      "state",
      selectedOptionstate.value ? selectedOptionstate.value : product.state
    );
    for (const key of Object.keys(
      productImage
        ? productImage
        : (productImage.FileList.name = product.productImage)
    )) {
      console.log(productImage);
      console.log(product.productImage);
      formData.append(
        "files",
        productImage[key] ? productImage[key] : product.productImage[key]
      );
      console.log(productImage[key]);
      console.log(product.productImage[key]);
    }
    console.log(values);
    console.log(selectedOptioncategory);
    console.log(selectedOptionstate);
    console.log(selectedOptiontype);
    console.log(selectedOptionmarque);
    const response = await axios
      .put(`/products/update-product/${product._id}`, formData)
      .then(() => dispatch(showForm(false)))
      .catch((err) => {
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
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const handledeleteproduct = () => {
    dispatch(deletesellerProduct(id));
    closeDropdownPopover();
    axios
      .delete(`/products/delete-product/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleupdateproduct = () => {
    dispatch(selectsellerProduct(product));
    closeDropdownPopover();
    dispatch(showForm(true));
  };

  return (
    <>
      <button
        className="text-blueGray-500 py-3 text-base	 px-5"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            handledeleteproduct();
          }}
        >
          Delete
        </button>
        <button
          className={
            onDeleted
              ? "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-red text-blueGray-700"
              : "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            //handleupdateproduct();
            setOpen(true);
            closeDropdownPopover();
          }}
        >
          Update
        </button>
      </div>
      
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <Formik
        initialValues={{
          label: product.label,
          price: product.price,
          reference: product.reference,
          description: product.description,
          state: product.state,
          type: product.type,
          marque: product.marque,
          category: product.category,
          // productImage: product.productImage[0],
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
                onChange={handleChange}
                onBlur={handleBlur}
                //value={product.label}
                placeholder={product.label}
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
                //value={product.price}
                placeholder={product.price}
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
                //value={product.reference}
                placeholder={product.reference}
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
                //value={product.description}
                placeholder={product.description}
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
                placeholder={product.category}
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
                placeholder={product.marque}
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
                placeholder={product.type}
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
                placeholder={product.state}
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
                setFieldValue(
                  "productImage",
                  event.currentTarget.files
                    ? event.currentTarget.files
                    : product.productImage
                );
                setimagesfiles(
                  event.target.files ? event.target.files : product.productImage
                );
              }}
              multiple
              //value={product.productImage}
            />
            {touched.productImage && errors.productImage ? (
              <Alert severity="error">{errors.productImage}</Alert>
            ) : null}

            <ButtonPrimary   onClick={() => {
              setOpen(false); }            } className="md:col-span-2" type="submit"
            >
              Update product
            </ButtonPrimary>
            
          </form>
        )}
      </Formik>
    </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProductManagement;
