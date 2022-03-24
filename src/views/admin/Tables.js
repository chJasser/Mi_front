import React, { useEffect } from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import CardTableReclamations from "components/Cards/CardTableReclamations";
import CardTableOfUsers from "components/Cards/CardTableOfUsers";
import { useDispatch } from "react-redux";
import { getAllRecs } from "app/reclamations/recSlice";
import { getAllUsers } from "app/usersSlice/adminSlice";

export default function Tables() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecs());
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableOfUsers color="light" />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableReclamations color="dark" />
        </div>
      </div>
    </>
  );
}
