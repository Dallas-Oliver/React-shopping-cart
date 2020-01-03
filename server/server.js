const express = require("express");
const app = express();
const port = 3001;
const uuid = require("uuid/v4");
const Product = require("../src/ProductClass");

const dummy_products = [
  new Product("shoes", "leather shoes", 34.99, uuid()),
  new Product("shirt", "striped shirt", 23.95, uuid()),
  new Product("pants", "blue jean denim pants", 42.91, uuid()),
  new Product("glasses", "aviator glasses", 16.95, uuid())
];

app.get("/products", (req, res) => {
  res.json(dummy_products);
});

app.listen(port, () => console.log(`listening on port ${port}`));
