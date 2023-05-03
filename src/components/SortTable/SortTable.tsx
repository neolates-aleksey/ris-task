import React, { useState } from 'react'
import "./SortTable.scss"

interface SortTableProps {
  currentData: any;
  keysArray?: any;
  setCurrentData: any;
}

export const SortTable = ({keysArray, currentData, setCurrentData}: SortTableProps) => {
   const [sortField, setSortField] = useState(null);
   const [sortOrder, setSortOrder] = useState('asc');

   const handleSortClick = (field: any) => {
     if (sortField === field) {
       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
     } else {
       setSortField(field);
       setSortOrder('asc');
     } 

     const sortedData = currentData.sort((a:any, b:any) => {
      if (sortField) {
        const fieldValueA = a[sortField];
        const fieldValueB = b[sortField];
        
        if (sortOrder === 'asc') {
          return fieldValueA.localeCompare(fieldValueB);
        } else {
          return fieldValueB.localeCompare(fieldValueA);
        }
      } else {
        return 0;
      }
    });
  
    setCurrentData(sortedData)
  };

  return (
    <div className='sort-table'>
     {keysArray.map((item:string) => (
        <div className='sort-table__item' key={item} onClick={() => handleSortClick(item)}>
          {item} {sortField === item && (sortOrder === 'asc' ? '▲' : '▼')}
        </div>
      ))}
    </div>
  )
}
