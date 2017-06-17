const db = require('../db');
const User = require('./user');
const Pet = require('./pet');

User.belongsToMany(Pet, { as: 'Interest', through: 'pet_interest' });
User.belongsToMany(Pet, { as: 'Reject', through: 'pet_reject' })
Pet.belongsToMany(User, { through: 'pet_interest' });
Pet.belongsToMany(User, { through: 'pet_reject' })

module.exports = {
	db,
	User,
	Pet,
};
