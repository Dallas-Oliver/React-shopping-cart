const express = require("express");
const app = express();
const port = 3001;
const uuid = require("uuid/v4");
const Product = require("../src/ProductClass");

app.use(express.json());

const dummy_products = [
  new Product("shoes", "leather shoes", 34.99, uuid()),
  new Product("shirt", "striped shirt", 23.95, uuid()),
  new Product("pants", "blue jean denim pants", 42.91, uuid()),
  new Product("glasses", "aviator glasses", 16.95, uuid())
];

const dummy_cart = [];

app.get("/products", (req, res) => {
  res.json(dummy_products);
});

app.post("/products/cart", (req, res) => {
  let product = req.body;
  dummy_cart.push(product);
  res.json(dummy_cart);
});

app.listen(port, () => console.log(`listening on port ${port}`));
