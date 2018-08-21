import React from 'react'
import { connect } from 'react-redux'
import { fetch, search } from '../Redux/actions'
import VideoListComponent from './VideoListComponent'

class HomeComponent extends React.Component {
  currentPageNumber = 1
  isSearchState = false

  constructor (props) {
    super(props)
    this.state = { searchString: '', showSearch: false }
  }

  componentDidMount () {
    this.props.fetchData(this.currentPageNumber)
  }

  changeSearchField = event => {
    this.setState({ searchString: event.target.value })
  }

  searchButtonClicked = () => {
    if (this.state.searchString && this.state.showSearch) {
      this.setState({ showSearch: false })
      this.getSearchData()
    } else if (!this.state.showSearch) this.setState({ showSearch: true })
  }

  getSearchData = () => {
    this.currentPageNumber = 1
    this.isSearchState = true
    this.props.search(this.currentPageNumber, this.state.searchString)
  }

  backButtonClicked = () => {
    if (this.state.showSearch) { this.setState({ showSearch: false, searchString: '' }) } else if (this.isSearchState) {
      this.currentPageNumber = 1
      this.props.fetchData(this.currentPageNumber)
    }
  }

  fetchVideoList = () => {
    this.currentPageNumber++
    this.props.fetchData(this.currentPageNumber)
  }

  render () {
    const isComplete =
      parseInt(this.props.totalVideos, 10) === this.props.videoList.length
    console.log('rendering')
    return (
      <div className='container'>
        <div className='navbar'>
          <input
            type='button'
            name='button'
            onClick={this.backButtonClicked}
            className='back-button'
          />
          <h1 className='heading'>{this.props.heading}</h1>
          <input
            type='button'
            name='button'
            onClick={this.searchButtonClicked}
            className='search-button'
          />
          {this.state.showSearch
            ? <input
              className='search-input'
              type='text'
              value={this.state.searchString}
              onChange={this.changeSearchField}
              />
            : null}
        </div>
        <VideoListComponent
          videos={this.props.videoList}
          onScrollEnd={this.fetchVideoList}
          isComplete={isComplete}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    heading: state.fetchVideoData.heading,
    videoList: state.fetchVideoData.videoList,
    totalVideos: state.fetchVideoData.totalVideos
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: pageNumber => {
    dispatch(fetch({ pageNumber }))
  },
  search: (pageNumber, searchString) => {
    dispatch(search({ pageNumber, searchString }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
