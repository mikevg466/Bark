const Sequelize = require('sequelize');
const db = require('../db');

const Pet = db.define('pet', {
  name: {
    type: Sequelize.STRING(),
  },
  image: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER(),
  },
  breed: {
    type: Sequelize.STRING(),
  },
  description: {
    type: Sequelize.TEXT(),
  },
});

module.exports = Pet;
