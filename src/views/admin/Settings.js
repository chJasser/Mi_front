import React, { useEffect, useState } from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import axios from "../../axiosInstance";
import { useDispatch } from "react-redux";
import { setUserLogedIn } from "app/slices/userSlice";
export default function Settings() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserLogedIn())
  }, [])


  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}
