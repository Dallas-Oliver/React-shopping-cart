import React, { Component } from "react";
import ProductItem from "./components/Product";
import CartTotal from "./components/CartTotal";

class ShoppingCart extends Component {
  render() {
    return (
      <div className="shopping-cart-container">
        <section className="products-section">
          <ul className="products-list">
            {this.props.productsInCart.map((product, index) => {
              return (
                <ProductItem
                  key={index}
                  image={product.imageURL}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  onClick={() => this.props.removeProduct(index, product.id)}
                  buttonText="Remove"
                />
              );
            })}
          </ul>
        </section>
        <CartTotal
          cartTotal={this.props.cartTotal}
          numberOfItemsInCart={this.props.numberOfItemsInCart}
          className="cart-total"
        />
      </div>
    );
  }
}

export default ShoppingCart;
