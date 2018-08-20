import React from 'react'
import { connect } from 'react-redux'
import './HomeComponent.css'
import { fetch } from '../Redux/actions'

class HomeComponent extends React.Component {

  currentPageNumber = 1;
  
  componentDidMount () {
    console.log('fetchData', this.props.fetchData)
    this.props.fetchData(this.currentPageNumber)
  }

  showUser = () => {
    if(this.props.videoList.length < parseInt(this.props.totalVideos))
      this.fetchVideoList();
    console.log('videos', this.props.videoList)
  }

  fetchVideoList = () => {
    this.currentPageNumber++;
    this.props.fetchData(this.currentPageNumber)
  } 

  getImagefromData = fileName => {
    let image
    try {
      image = require(`./../Images/${fileName}`)
    } catch (e) {
      console.log(e)
      image = require(`./../Images/placeholder_for_missing_posters.png`)
    }
    return image
  }

  render () {
    console.log('videos', this.props.videoList)
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
        <div className='list-container'>
          <div className='scroll-list'>
            {this.props.videoList &&
              this.props.videoList.map((video, index) => {
                const image = this.getImagefromData(video['poster-image'])
                return (
                  <div key={index} className='video-cell'>
                    <img src={image} alt='image' />
                    <p className='video-name'>{video.name}</p>
                  </div>
                )
              })}
          </div>
        </div>
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
