import {useMemo} from "react";
import {getPagesArray} from "../utils/pages";

export const usePaganitaion = (totalPages) => {
  return useMemo(() =>{
    return getPagesArray(totalPages)
  }, [totalPages])
}