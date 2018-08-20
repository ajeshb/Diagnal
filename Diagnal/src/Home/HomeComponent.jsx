import React from 'react'
import { connect } from 'react-redux'
import './HomeComponent.css'
import { fetch } from '../Redux/actions'
import VideoListComponent from './VideoListComponent'

class HomeComponent extends React.Component {
  currentPageNumber = 1

  componentDidMount () {
    this.props.fetchData(this.currentPageNumber)
  }

  showUser = () => {}

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
            onClick={this.showUser}
            className='back-button'
          />
          <h1 className='heading'>{this.props.heading}</h1>
          <input
            type='button'
            name='button'
            onClick={this.showUser}
            className='search-button'
          />
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
  console.log('eweed', state)
  return {
    heading: state.fetchData.heading,
    videoList: state.fetchData.videoList,
    totalVideos: state.fetchData.totalVideos
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: params => {
    console.log('inside mdp')
    dispatch(fetch(params))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
