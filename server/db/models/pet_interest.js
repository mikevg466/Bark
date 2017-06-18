const Sequelize = require('sequelize');
const db = require('../db');

const Pet = db.define('pet_interest', {
  user_message: {
    type: Sequelize.BOOLEAN(),
  }
  adopter_message: {
    type: Sequelize.TEXT(),
  },
});

module.exports = Pet;
