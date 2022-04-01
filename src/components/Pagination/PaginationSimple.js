import Button from "components/Button/Button";
import ButtonPrimary from "components/Button/ButtonPrimary";
import React from "react";

const PaginationSimple = ({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
  lastPage,
}) => {
  return (
    <div className="py-2">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium">{currentPage * postsPerPage - 5}</span>
          to
          {currentPage * postsPerPage <= totalPosts ? (
            <span className="font-medium"> {currentPage * postsPerPage} </span>
          ) : (
            <span className="font-medium"> {totalPosts} </span>
          )}
          of
          <span className="font-medium"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex  rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <ButtonPrimary
            disabled={currentPage === 1}
            onClick={() => {
              paginateBack();
            }}
          >
            PREV
          </ButtonPrimary>
          <span className="mx-10"> </span>
          <ButtonPrimary
            disabled={currentPage === lastPage}
            onClick={() => {
              paginateFront();
            }}
          >
            NEXT
          </ButtonPrimary>
        </nav>
      </div>
    </div>
  );
};

export default PaginationSimple;
