class Product {
  constructor(imageURL, title, description, price, uId) {
    this.imageURL = imageURL;
    this.title = title;
    this.description = description;
    this.price = price;
    this.id = uId;
  }
}

module.exports = Product;
