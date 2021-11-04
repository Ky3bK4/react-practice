import React from 'react';
import {usePaganitaion} from "../../../hooks/usePaganitaion";

const Pagination = ({totalPages, currentPage, changePage}) => {
  const pagesArray = usePaganitaion(totalPages)
  return (
    <div className="paginationWrapper">
      {
        pagesArray.map(p =>
          <span
            onClick={()=>changePage(p)}
            key={p}
            className={currentPage === p ? 'paginationItem current' : 'paginationItem'}
          >
              {p}
            </span>
        )
      }
    </div>
  );
};

export default Pagination;