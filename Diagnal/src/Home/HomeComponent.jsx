import React from 'react'
import './HomeComponent.css'

class HomeComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      heading: 'Romantic Commedy',
      videoList: [],
      totalVideos: 0
    }
  }
  componentDidMount () {
    this.getCollectionsApi(1)
  }
  showUser = () => {
    console.log("videos", this.state.videoList)
  }
  getCollectionsApi = pageNumber => {
    const requestUrl = `./../Data/file${pageNumber}.json`
    const response = require('./../../src/Data/file1.json')
    // import(`${requestUrl}`).then(
    //   response => {
    //     debugger
        const pageData = response.page
        const initialVideos = this.state.videoList
        const newVideos = pageData['content-items']['content']
        
        this.setState({
          videoList: [...initialVideos, ...newVideos],
          heading: pageData.title,
          totalVideos: pageData['total-content-items']
        })
    //   },
    //   error => {
    //     debugger
    //     console.log('error', error)
    //   }
    // )
  }
  render () {
    console.log("videos", this.state.videoList)
    console.log("rendering")
    return (
      <div className='container'>
        <div className='navbar'>
          <input
            type='button'
            name='button'
            onClick={this.showUser}
            className='back-button'
          />
          <h1 className='heading'>{this.state.heading}</h1>
          <input
            type='button'
            name='button'
            onClick={this.showUser}
            className='search-button'
          />
        </div>
        <div className='list-container'>
          <div className="scroll-list">
          { this.state.videoList.map( (video, index) => {
             return <div key={index} className="video-cell">
              </div>
          })}
          </div>
        </div>
      </div>
    )
  }
}

export const Home = HomeComponent
