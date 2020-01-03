import React from "react";
import Product from "./ProductClass";
import uuid from "uuid/v4";
import ProductPage from "./ProductPage";
import ShoppingCart from "./ShoppingCart";
import { Route, NavLink, HashRouter } from "react-router-dom";

class App extends React.Component {
  state = {
    products: [],
    productsInCart: [],
    numberOfItemsInCart: 0,
    cartTotal: "0"
  };

  //on component mount, make a call to the server retrieving all items in the "available products DB" and push them to this.state.products.

  componentDidMount = async () => {
    let response = await fetch("http://localhost:3000/products");
    let products = await response.json();
    console.log(products);

    this.setState({ products });
  };

  addToCart = async (index, id) => {
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

      const response = await fetch("http://localhost:3000/products/cart", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newItem)
      });

      const items = await response.json();
      console.log(items);

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
        this.calculateCartTotal();
      }
    );
  };

  calculateCartTotal = () => {
    const productPrices = [];
    this.state.productsInCart.forEach(product => {
      productPrices.push(product.price);
    });

    const cartTotal = productPrices.reduce(
      (accumulator, current) => accumulator + current,
      0
    );

    let finalPrice = cartTotal.toFixed(2);

    this.setState({ cartTotal: finalPrice });
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
