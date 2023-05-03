import React, { Dispatch, SetStateAction } from 'react'
import "./TableSelectApi.scss"

interface TableSelectApiProps {
  setApiEndpoint: Dispatch<SetStateAction<string>>;
  disableSelect: boolean;
}

export const TableSelectApi = ({setApiEndpoint, disableSelect}: TableSelectApiProps) => {
  const handleApiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setApiEndpoint(e.target.value);
  };

  return (
    <select disabled={disableSelect} className='table-select' onChange={handleApiChange}>
      <option className='table-select__option' value="location">Location</option>
      <option className='table-select__option' value="character">Characters</option>
    </select>
  )
}
