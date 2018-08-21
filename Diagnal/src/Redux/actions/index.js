const FETCH_DATA = 'FETCH_DATA'
const SEARCH_DATA = 'SEARCH_DATA'

export const fetch = param => ({
  type: FETCH_DATA,
  param
})
export const search = param => ({
  type: SEARCH_DATA,
  param
})
