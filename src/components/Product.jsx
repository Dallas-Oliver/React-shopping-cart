import React, { Component } from "react";
import ImageRenderer from "./ImageRenderer";

class ProductItem extends Component {
  render() {
    return (
      <div className="product">
        <div className="image-price">
          <ImageRenderer image={this.props.image} />
          <h3 className="price">${this.props.price}</h3>
        </div>
        <section className="product-info">
          <div className="desc-title">
            <div>
              <h3 className="title">{this.props.title}</h3>
              <p className="description">{this.props.description}</p>
            </div>
          </div>
        </section>
        <button onClick={this.props.onClick} className="add-to-cart">
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

export default ProductItem;
