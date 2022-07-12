const Sequelize = require("sequelize");
const db = require("../config/db");

const Whatsapp = db.define("whatsapp", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  payload: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  stage: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  step: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Whatsapp;
