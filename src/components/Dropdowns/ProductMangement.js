import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import axios from "axiosInstance";
import { useDispatch } from "react-redux";

import{deletesellerProduct,addProduct,selectsellerProduct,populatesellerProducts}from "app/productslice/Productsliceseller"

const ProductManagement = (props) => {
  const [onDeleted, setOnDeleted] = useState(false);
  const { id, product } = props;
  const dispatch = useDispatch();
  // dropdown props
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
  const handledeleteproduct=()=>{
     dispatch(deletesellerProduct(id));
      closeDropdownPopover();
    axios.delete(`/products/delete-product/${id}`).then((res)=>{
          console.log(res.data);
      }).catch((err)=>{
          console.log(err);
      })
  }
  const handleupdateproduct=()=>{
      dispatch(selectsellerProduct(product));
      closeDropdownPopover();

  }
  
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
            handleupdateproduct();
          }}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default ProductManagement;
