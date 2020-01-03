import React, { Component } from "react";

class CartTotal extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <h3>
          Subtotal ({this.props.numberOfItemsInCart}{" "}
          {this.props.numberOfItemsInCart === 1 ? "item" : "items"}): $
          {this.props.cartTotal}
        </h3>
        <button>Checkout</button>
      </div>
    );
  }
}

export default CartTotal;
