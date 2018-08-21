const fetchVideoData = (state = { videoList: [] }, action) => {
  let pageNumber
  switch (action.type) {
    case 'FETCH_DATA':
      console.log('action', action)
      pageNumber = action.param.pageNumber
      const response = require(`./../../Data/CONTENTLISTINGPAGE-PAGE${pageNumber}.json`)
      const pageData = response.page
      const newVideos = pageData['content-items']['content']
      const currentVideos = pageNumber > 1 ? state.videoList : []
      const newstate = {
        ...state,
        videoList: [...currentVideos, ...newVideos],
        heading: pageData.title,
        totalVideos: pageData['total-content-items']
      }
      console.log('state', state)
      console.log('newstate', newstate)
      return newstate
    case 'SEARCH_DATA':
      console.log('action', action)
      pageNumber = action.param.pageNumber
      const searchString = action.param.searchString
      const filteredVideos = state.videoList.filter( video => video.name.toLowerCase().includes(searchString.toLowerCase()))
      const searchResultstate = {
        ...state,
        videoList: filteredVideos,
        heading: searchString,
        totalVideos: filteredVideos.length
      }
      console.log('state', state)
      console.log('newstate', searchResultstate)
      return searchResultstate
    default:
      return state
  }
}

export default fetchVideoData
