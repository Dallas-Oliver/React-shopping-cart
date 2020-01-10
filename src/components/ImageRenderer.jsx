import React, { Component } from "react";

class ImageRenderer extends Component {
  render() {
    return (
      <div className="image-container">
        <img src={this.props.image} width={210} height={210} alt="img"></img>
      </div>
    );
  }
}

export default ImageRenderer;
