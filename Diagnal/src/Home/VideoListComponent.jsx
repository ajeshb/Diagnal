import React from 'react'
import './VideoListComponent.css'

class VideoListComponent extends React.Component {
  isApiUpdated = true // BOOLEAN VALUE USED TO TRACK API CALL WHEN SCROLLING

  componentDidUpdate (prevProps) {
    if (prevProps.videos.length !== this.props.videos.length) { this.isApiUpdated = true }
  }

  trackScrolling = () => {
    if (this.props.isComplete || !this.isApiUpdated) return
    const wrappedElement = document.getElementById('scroll-panel')
    if (this.isBottom(wrappedElement)) {
      console.log('header bottom reached')
      this.props.onScrollEnd()
      this.isApiUpdated = false
    }
  }

  isBottom (element) {
    const bottomOffset =
      element.getBoundingClientRect().bottom - window.innerHeight
    const cellHeight =
      element.clientHeight / Math.ceil(this.props.videos.length / 3) // HEIGHT OF EACH CELL (CELL HEIGHT + MARGIN)
    const offsetCheck = (this.props.videos.length % 3 ? 1.5 : 0.5) * cellHeight // API CALL IS MADE WHEN SCROLL REACHES HALF OF THE LAST COMPLETE ROW
    const bufferHeight = 10 // THIS HEIGHT USES AS A BUFFER HEIGHT FOR API CALL
    return bottomOffset - offsetCheck < bufferHeight
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
    return (
      <div className='list-container overflow-scroll' onScroll={this.trackScrolling}>
        {this.props.videos.length? <div className='scroll-list' id='scroll-panel'>
          {
            this.props.videos.map((video, index) => {
              const image = this.getImagefromData(video['poster-image'])
              return (
                <div key={index} className='video-cell inline-block'>
                  <img src={image} alt={video.name} />
                  <p className='video-name'>{video.name}</p>
                </div>
              )
            })}
        </div> : <p className="error-message w-screen text-centre text-white"> No Video to show </p>}
      </div>
    )
  }
}

export default VideoListComponent
