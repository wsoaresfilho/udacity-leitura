import { SORT_BY_DATE } from './constants'

export const showSortString = (s) => {
  if(s===SORT_BY_DATE)
    return "Date"
  else
    return "Score"
}