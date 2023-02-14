import React from "react";
import _ from "lodash";
const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  prev,
  next,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1 || itemsCount === 0) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav className="pagination">
      <ul className="paginationItem ">
        <a className=" paginationLink arrow" onClick={prev}>
          {" "}
          &lt;
        </a>
      </ul>
      {pages.map((page) => (
        <ul
          key={"page_" + page}
          className={
            "paginationItem " + (currentPage === page ? " active" : "")
          }>
          <a onClick={() => onPageChange(page)} className="paginationLink">
            {page}
          </a>
        </ul>
      ))}
      <ul className="paginationItem">
        <a className="paginationLink arrow" onClick={() => next(pages.length)}>
          &gt;{" "}
        </a>
      </ul>
    </nav>
  );
};

export default Pagination;
