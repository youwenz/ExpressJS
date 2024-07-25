// const fs = require('fs');
const path = require("path");
const db = require("../util/database");
const Cart = require("./cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  // save() {
  //   getProductsFromFile(products => {
  //     if (this.id) {
  //       const existingProductIndex = products.findIndex(
  //         prod => prod.id === this.id
  //       );
  //       const updatedProducts = [...products];
  //       updatedProducts[existingProductIndex] = this;
  //       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
  //         console.log(err);
  //       });
  //     } else {
  //       this.id = Math.random().toString();
  //       products.push(this);
  //       fs.writeFile(p, JSON.stringify(products), err => {
  //         console.log(err);
  //       });
  //     }
  //   });
  // }

  // static deleteById(id) {
  //   getProductsFromFile(products => {
  //     const product = products.find(prod => prod.id === id);
  //     const updatedProducts = products.filter(prod => prod.id !== id);
  //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
  //       if (!err) {
  //         Cart.deleteProduct(id, product.price);
  //       }
  //     });
  //   });
  // }

  // static fetchAll(cb) {
  //   getProductsFromFile(cb);
  // }

  // static findById(id, cb) {
  //   getProductsFromFile(products => {
  //     const product = products.find(p => p.id === id);
  //     cb(product);
  //   });
  // }

  save() {
    return db.query(
      "INSERT INTO public.products (title, price, description, \"imageUrl\") VALUES ($1, $2, $3, $4)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static deleteById(id) {
    return db.query("DELETE FROM products WHERE id = $1", [id]);
  }

  static fetchAll() {
    return db.query("SELECT * FROM products");
  }

  static findById(id) {
    return db.query("SELECT * FROM products WHERE id = $1", [id]);
  }
};
