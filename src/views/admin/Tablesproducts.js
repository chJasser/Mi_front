import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import TableOfProducts from "components/Cards/TableOfProducts";


export default function Tablesproducts() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TableOfProducts color="light" />
        </div>
      </div>
    </>
  );
}