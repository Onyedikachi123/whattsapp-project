const Sequelize = require("sequelize");
const db = require("../config/db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
  },
  product_name: {
    type: Sequelize.STRING,
  },
  product_description: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
