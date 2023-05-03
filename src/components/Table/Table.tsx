import React, { useEffect, useState } from "react";
import { rickAndMortyAPI } from "../../api/rickAndMorty";
import { ICharacter, ILocation, Result } from "../../api/types";
import { Loader } from "../Loader/Loader";
import { TablePagination } from "../TablePagination/TablePagination";
import { TableDisplayItems } from "../TableDisplayItems/TableDisplayItems";
import { TableFilter } from "../TableFilter/TableFilter";
import { TableSelectApi } from "../TableSelectApi/TableSelectApi";
import "./Table.scss";

export const Table = () => {
  const [apiEndpoint, setApiEndpoint] = useState<string>("location");
  const [apiData, setApiData] = useState<Result[]>();
  const [currentData, setCurrentData] = useState<Result[]>();

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [filteredData, setFilteredData] = useState<Result[]>();
  const [disableSelect, setDisabledSelect] = useState<boolean>(false);

  const getDataFromApi = (endpoint: string, data:Result[], page: any) => {
    const currentEndpoint = endpoint === "location" ? rickAndMortyAPI.getLocations(page) : rickAndMortyAPI.getCharacters(page)
    
    currentEndpoint.then((res) => {
      const nextUrl = res.data.info.next;
      const getUrlPage = res.data.info.next && res.data.info.next.split('=').pop()
      const pieceOfData = res.data.results;

      if (!nextUrl) {
        setApiData([...data, ...pieceOfData]);
      } else {
        getDataFromApi(endpoint, [...data, ...pieceOfData], getUrlPage);
      }
    })
  }

  useEffect(() => {
    getDataFromApi(apiEndpoint, [], 1)
  }, [apiEndpoint]);

  useEffect(() => {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    if (filteredData && filteredData.length !== 0) {
      setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
      setCurrentData(filteredData.slice(startIndex, endIndex));
      setDisabledSelect(true);
      
    } else {
      if (apiData !== undefined) {
        setTotalPages(Math.ceil(apiData.length / rowsPerPage));
        setCurrentData(apiData.slice(startIndex, endIndex));
        setDisabledSelect(false)
      }
    }
  }, [apiData, currentPage, rowsPerPage, filteredData]);

  return (
    <div className="table">
      <div className="table__header">
        <TableSelectApi disableSelect={disableSelect} setApiEndpoint={setApiEndpoint} />
        <TableFilter setApiData={setFilteredData} data={apiData} />
      </div>
      <div className="table__body">
        <div className='table__sort'>
          {currentData && Object.keys(currentData[0]).map((item:string) => (
            <div className='table__sort-item' key={item}>
              {item}
            </div>
          ))}
        </div>
        {currentData ? (
          currentData.map((item: ILocation | ICharacter) => (
            <div className="table__row" key={item.id}>
              {Object.values(item).map((element: Result[], index) => (
                <div key={index} className="table__cell">
                  {typeof element == "object" ? JSON.stringify(element) : element}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="table__loader">
            <Loader />
          </div>
        )}

        <div className="table__footer">
          <TableDisplayItems
            rowsPerPage={rowsPerPage}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
          />
          <TablePagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
