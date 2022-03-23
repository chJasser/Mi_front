import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import TableOfUsers from "components/Cards/TableOfUsers";
import CardTableOfUsers from "components/Cards/CardTableOfUsers";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableOfUsers color="light" />
        </div>
      </div>
    </>
  );
}
