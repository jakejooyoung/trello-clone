const dotenv = require('dotenv').config();
const Sequelize = require("sequelize");

module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "trello-devdb",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": Sequelize.Op
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "trello-testdb",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": Sequelize.Op
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "operatorsAliases": Sequelize.Op
  }
}
