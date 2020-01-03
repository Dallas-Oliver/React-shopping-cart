import React, { Component } from "react";
import ProductItem from "./components/Product";

class ProductPage extends Component {
  render() {
    return (
      <div>
        <section className="products-section">
          <ul className="products-list">
            {this.props.products.map((product, index) => {
              return (
                <ProductItem
                  key={product.id}
                  imageSrc={product.imageSrc}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  onClick={() => this.props.addToCart(index, product.id)}
                  buttonText="Add to Cart"
                />
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}

export default ProductPage;
