import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyLoad from "react-image-lazy-load";
import * as PlaceholderImage from "./../Images/placeholder_for_missing_posters.png";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./VideoListComponent.css";

class VideoListComponent extends React.Component {
  isApiUpdated = true; // BOOLEAN VALUE USED TO TRACK API CALL WHEN SCROLLING
  oldOffset = undefined; //  TO TRACK THE LAST SCROLL POINT

  componentDidMount() {
    // const element = document.getElementById('scroll-panel')
    this.width = (window.innerWidth - 60) / 3;
    this.height = (this.width * 3) / 2;
    debugger;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videos.length !== this.props.videos.length) {
      this.isApiUpdated = true;
    }
  }

  trackScrolling = () => {
    if (this.props.isComplete || !this.isApiUpdated) return;
    const wrappedElement = document.getElementById("scroll-panel");
    if (this.isBottom(wrappedElement)) {
      this.oldOffset = undefined;
      this.props.onScrollEnd();
      this.isApiUpdated = false;
    }
  };

  isBottom(element) {
    const bottomOffset =
      element.getBoundingClientRect().bottom - window.innerHeight;
    const speedFactor = this.oldOffset ? this.oldOffset - bottomOffset : 0; // TO HANDLE SCROLL SPEED
    this.oldOffset = bottomOffset;
    const cellHeight =
      element.clientHeight / Math.ceil(this.props.videos.length / 3); // HEIGHT OF EACH CELL (CELL HEIGHT + MARGIN)
    const offsetCheck = (this.props.videos.length % 3 ? 2 : 1) * cellHeight; // API CALL IS MADE WHEN SCROLL REACHES THE LAST COMPLETE ROW
    const bufferHeight = 10 + speedFactor; // THIS HEIGHT USES AS A BUFFER HEIGHT FOR API CALL
    console.log("cellHeight", cellHeight);
    return bottomOffset - offsetCheck < bufferHeight;
  }

  getImagefromData = fileName => {
    let image;
    try {
      image = require(`./../Images/${fileName}`);
    } catch (e) {
      console.log(e);
      image = require(`./../Images/placeholder_for_missing_posters.png`);
    }
    return image;
  };

  render() {
    return (
      <div
        className="list-container overflow-scroll"
        onScroll={this.trackScrolling}
      >
        {this.props.videos.length ? (
          <div className="scroll-list" id="scroll-panel">
            {this.props.videos.map((video, index) => {
              const image = this.getImagefromData(video["poster-image"]);
              return (
                <div key={index} className="video-cell inline-block">
                  <img src={image} alt={video.name} />
                  {/* <LazyLoadImage
                    height={this.height}
                    width={this.width}
                    effect="blur"
                    alt={video.name}
                    src={image} // use normal <img> attributes as props
                  />
                  <LazyLoad
                    height={this.height}
                    loaderImage
                    originalSrc={image}
                    imageProps={{
                      src: PlaceholderImage,
                      alt: "DR_MVMQ20Feb2015ouellet1024.jpg",
                      ref: "image",
                      className: "className"
                    }}
                  /> */}
                  <p className="video-name">{video.name}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="error-message w-screen text-centre text-white">
            {" "}
            No Video to show{" "}
          </p>
        )}
      </div>
    );
  }
}

export default VideoListComponent;
