// const http = require("http");

//initialize a new object that manages logic
// const rqListener = require('./routes');

// const server = http.createServer(rqListener);
//creates a server that listens to server ports and gives
//a response back to the client
//execute the function passed when a request is received

// const server = http.createServer(app);
// server.listen(3000);

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();
app.set("view engine", "pug");
//set values globally in the express app
//set the templating engine to pug as default
app.set("views", "views");
//find the templates in the views folder

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require('./routes/auth');

//parsing of the request body and populates the req.body with the parsed data
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
//middleware function: executed for every incoming request

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
//adding the routes from admin.js
//adding a filter (common starting segments)
app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use(authRoutes);

//fallback routes
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
//user created products, if the user is deleted the product will be deleted

User.hasMany(Product);
//a user can add many product to the shop
//add a key (userid) to the product

User.hasOne(Cart);
Cart.belongsTo(User);
//add a key (userid) to the cart

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
//create a third table to store the many-to-many relationship

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
//sync models to the database by creating tables in the database
