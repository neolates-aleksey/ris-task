import React, { Dispatch, SetStateAction } from "react";

interface TableDisplayItemsProps {
  rowsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}

export const TableDisplayItems = ({
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
}: TableDisplayItemsProps) => {
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0);
    setRowsPerPage(parseInt(e.target.value));
  };

  return (
    <select className="table-select" value={rowsPerPage} onChange={handleRowsPerPageChange}>
      <option className="table-select__option" value="5">5</option>
      <option className="table-select__option" value="10">10</option>
      <option className="table-select__option" value="15">15</option>
    </select>
  );
};
