const express = require("express");
const app = express();
const port = 3001;
const uuid = require("uuid/v4");
const Product = require("../src/ProductClass");
const fetch = require("node-fetch");

app.use(express.json());

/*DONE: make request to Unsplash for random image for each product. adjust the Product class to require an image for each instance of Product */

const dummy_cart = [];

app.get("/products", (req, res) => {
  const options = {
    "Accept-Version": "v1"
  };
  fetch(
    `https://api.unsplash.com/photos/random/?count=12&client_id=f8168f4afe1f018c47d403805173d9ced58a0821e2be27319220cec6e6e14a8a`,
    options
  )
    .then(res => res.json())
    .then(json => {
      const imageUrls = json.map(image => {
        return image["urls"]["small"];
      });

      const dummy_products = [
        new Product(imageUrls[0], "shoes", "leather shoes", 34.99, uuid()),
        new Product(imageUrls[1], "shirt", "striped shirt", 23.95, uuid()),
        new Product(imageUrls[2], "pants", "denim pants", 42.91, uuid()),
        new Product(imageUrls[3], "glasses", "aviator glasses", 16.95, uuid()),
        new Product(imageUrls[4], "gloves", "warm gloves", 16.95, uuid()),
        new Product(imageUrls[5], "hat", "knit hat", 12.65, uuid()),
        new Product(imageUrls[6], "shoes", "leather shoes", 34.99, uuid()),
        new Product(imageUrls[7], "shirt", "striped shirt", 23.95, uuid()),
        new Product(imageUrls[8], "pants", "denim pants", 42.91, uuid()),
        new Product(imageUrls[9], "glasses", "aviator glasses", 16.95, uuid()),
        new Product(imageUrls[10], "gloves", "warm gloves", 16.95, uuid()),
        new Product(imageUrls[11], "hat", "knit hat", 12.65, uuid())
      ];
      res.send({ dummy_products });
      console.log(dummy_products);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/products/cart", (req, res) => {
  let product = req.body;
  dummy_cart.push(product);
  res.json(dummy_cart);
});

app.listen(port, () => console.log(`listening on port ${port}`));
