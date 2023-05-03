import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { Result } from '../../api/types';
import "./TableFilter.scss"

interface TableFilterProps {
  data: Result[] | undefined;
  setApiData: any;
}

export const TableFilter = ({data, setApiData}: TableFilterProps) => {
  const [searchValue, setSearchValue] = useState<string>()
  const [dropdownFilters, setDropdownFilters] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  
  const getOptions = () => {
    if (data) {
      const filter = data[0].hasOwnProperty("species") ? "species" : "type"
  
      const tableData = data.map((item:any) => item[filter]).sort();
      const options:any = [];
  
      tableData.forEach((el:any) => {
        !options.includes(el) && options.push(el)
      });
  
      return options
    }
  }
  
  const options = getOptions()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)

    setDropdownFilters(options!.filter((item:any) => item.includes(e.target.value)));
  }

  const onFilterClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof Element) {
      const targetFilter = e.target.getAttribute('data-tag')
      
      setActiveFilters((activeFilters:any) => [...activeFilters, targetFilter])
    }
  }

  const handleRemoveFilter = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof Element) {
      const removeTarget = e.target.getAttribute('data-tag')
      const updatedArray = activeFilters.filter((item:string) => {return item !== removeTarget})
      setActiveFilters(updatedArray);
    }
  }

  useEffect(() => {
    let filteredArray = []

    if (data) {
      filteredArray = data.filter((object: Result) => {
        const objectValues = Object.values(object);
        return activeFilters.some((string:string) => objectValues.includes(string));
      });

      filteredArray.length !== 0 ? setApiData(filteredArray) : setApiData([])     
    }

  }, [activeFilters])

  return (
    <div className='table-filter'>
      <input className='table-filter__input' onFocus={() => {setDropdownFilters(options)}} placeholder='Search...' type="text" value={searchValue} onChange={onInputChange} />

      <div className='table-filter__tags'>
        {activeFilters.map((item:string) => (
          <div data-tag={item} onClick={handleRemoveFilter} className='table-filter__tag' key={item}>{item}</div>
        ))}
      </div>

      <div className='table-filter__dropdown'>
        {dropdownFilters.length > 0 ? dropdownFilters.map((item:string) => (
          <div data-tag={item} key={item} className={classNames('table-filter__dropdown-item', {"table-filter__dropdown-item_chosed": activeFilters.includes(item)})} onClick={onFilterClick}>{item}</div>
        )): <div className='table-filter__dropdown-empty'>No such filters :(</div>}
      </div>
    </div>
  )
}
