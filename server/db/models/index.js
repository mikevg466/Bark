const db = require('../db');
const User = require('./user');
const Pet = require('./pet');
const PetInterest = require('./pet_interest');

User.belongsToMany(Pet, { as: 'Interest', through: PetInterest });
User.belongsToMany(Pet, { as: 'Reject', through: 'pet_rejects' });
User.belongsToMany(Pet, { as: 'Adopt', through: 'pet_adopts'});
Pet.belongsToMany(User, { through: PetInterest });
Pet.belongsToMany(User, { through: 'pet_reject' });

module.exports = {
	db,
	User,
	Pet,
	PetInterest,
};
