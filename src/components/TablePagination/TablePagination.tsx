import React, { Dispatch, SetStateAction, useState } from "react";
import "./TablePagination.scss"
import classNames from "classnames";

interface TablePaginationProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export const TablePagination = ({
  setCurrentPage,
  totalPages,
}: TablePaginationProps) => {
  const [actveButton, setActiveButton] = useState<number>(0)

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    setActiveButton(pageNum);
  };

  return (
    <div className="table-pagination">
      {[...Array(totalPages)].map((_, i) => (
        <button
          className={classNames("table-pagination__button", {"table-pagination__button_acitve": i === actveButton})}
          disabled={actveButton === i}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
