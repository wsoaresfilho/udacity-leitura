import { SORT_BY_DATE } from './constants'

export const showSortString = (s) => {
  if(s===SORT_BY_DATE)
    return "Date"
  else
    return "Score"
}

export const validateForm = (object) => {
  let valid = true
  for (const key in object) {
    if (object[key] === null || object[key] === "" ) {
      valid = false
    }
  }
  return valid
}