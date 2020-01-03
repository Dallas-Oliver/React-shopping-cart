import React from "react";
import Product from "./ProductClass";
import uuid from "uuid/v4";
import ProductPage from "./ProductPage";
import ShoppingCart from "./ShoppingCart";
import { Route, NavLink, HashRouter } from "react-router-dom";

class App extends React.Component {
  state = {
    products: [
      new Product("shoes", "leather shoes", 34.99, uuid()),
      new Product("shirt", "striped shirt", 23.95, uuid()),
      new Product("pants", "blue jean denim pants", 42.91, uuid())
    ],
    productsInCart: [],
    numberOfItemsInCart: 0,
    cartTotal: 0
  };

  //on component mount, make a call to the the server retrieving all items in the "available products DB" and push them to this.state.products.

  addToCart = (index, id) => {
    const tempProducts = [...this.state.products];
    const productToAdd = tempProducts
      .filter(product => product.id === id)
      .pop();

    if (productToAdd) {
      const newItem = new Product(
        productToAdd.title,
        productToAdd.description,
        productToAdd.price,
        uuid()
      );

      this.setState(
        prevState => ({
          productsInCart: prevState.productsInCart.concat(newItem),
          numberOfItemsInCart: prevState.numberOfItemsInCart + 1
        }),
        () => this.calculateCartTotal()
      );
    }
  };

  removeProduct = (index, id) => {
    const tempProducts = [...this.state.productsInCart];
    const newProductsInCart = tempProducts.filter(product => product.id !== id);

    this.setState(
      prevState => ({
        productsInCart: newProductsInCart,
        numberOfItemsInCart: prevState.numberOfItemsInCart - 1
      }),
      () => {
        console.log(this.state);
        this.calculateCartTotal();
      }
    );
  };

  calculateCartTotal = () => {
    const productPrices = [];
    for (let i = 0; i < this.state.productsInCart.length; i++) {
      productPrices.push(this.state.productsInCart[i].price);
    }

    const cartTotal = productPrices.reduce(
      (accumulator, current) => accumulator + current,
      0
    );

    this.setState({ cartTotal }, () =>
      console.log(
        productPrices,
        this.state.cartTotal,
        this.state.numberOfItemsInCart,
        this.state.productsInCart
      )
    );
  };

  render() {
    return (
      <HashRouter>
        <div>
          <section className="header">
            <h2>
              <NavLink to="/">Home</NavLink>
            </h2>
            <section className="cart-section">
              <NavLink to="/cart">
                <button>Cart ({this.state.numberOfItemsInCart})</button>
              </NavLink>
            </section>
          </section>
          <hr />
          <section className="content">
            <Route
              exact
              path="/"
              render={props => (
                <ProductPage
                  {...props}
                  addToCart={this.addToCart}
                  products={this.state.products}
                />
              )}
            />
            <Route
              path="/cart"
              render={props => (
                <ShoppingCart
                  {...props}
                  productsInCart={this.state.productsInCart}
                  cartTotal={this.state.cartTotal}
                  numberOfItemsInCart={this.state.numberOfItemsInCart}
                  removeProduct={this.removeProduct}
                />
              )}
            />
          </section>
        </div>
      </HashRouter>
    );
  }
}

export default App;
