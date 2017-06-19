
const db = require('../server/db');
const Promise = require('bluebird');

const data = {
  pet: [
    {
      name: 'Max',
      image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-15.jpg',
      age: 1,
      breed: 'puff ball',
      description: 'Cute and fast!'
    },
    {
      name: 'Spike',
      image: 'https://s-media-cache-ak0.pinimg.com/736x/a2/42/d5/a242d5a7fca86aeda26676c8627e82c0.jpg',
      age: 8,
      breed: 'French Bull',
      description: 'Always happy!'
    },
    {
      name: 'Snowball',
      image: 'https://s-media-cache-ak0.pinimg.com/736x/13/04/18/130418ded199cdc061e2ce711c9092fd.jpg',
      age: 4,
      breed: 'Persian Fluff',
      description: 'Loves blowdryers!'
    },
    {
      name: 'Twitch',
      image: 'http://www.downesvets.co.uk/wp-content/uploads/2015/07/kitten-package1.png',
      age: 1,
      breed: 'Greydon',
      description: 'Super playful and full of energy!'
    },
    {
      name: 'Grumpy Cat',
      image: 'https://images-production.global.ssl.fastly.net/uploads/posts/image/47360/grumpy-cat.jpg',
      age: 15,
      breed: 'Grupy Persian',
      description: 'Always grumpy. A real downer...'
    },
    {
      name: 'Repunzel'
      image: 'https://s-media-cache-ak0.pinimg.com/originals/8c/c7/d6/8cc7d69bc563f2b60fb202237e99ba30.jpg',
      age: 10,
      breed: 'Crazy Long Hair',
      description: 'Super long hair.  Will take you forever to comb. Repunzel, repunzel...'
    },
    {
      name: 'Rex',
      image: 'http://buzz.iloveindia.com/wp-content/uploads/2015/09/large-dog-breeds-10.2.jpg',
      age: 8,
      breed: 'Bear?',
      description: 'Is it a bear or a dog?!?!'
    },
    {
      name: 'Zim',
      image: 'https://featuredcreature.com/wp-content/uploads/2011/12/DSC_0156.jpg',
      age: 4,
      breed: 'Alien',
      description: 'Oh god... I think this is an alien...'
    },
    {
      name: 'Spot',
      image: 'https://s-media-cache-ak0.pinimg.com/736x/25/67/48/256748946d8f71498fbdd6827bf186a3.jpg',
      age: 1,
      breed: 'Munchkin',
      description: 'So cute I\'m gonna die!!! Sooooo fluffyyyy!!!'
    },
    {
      name: 'Grrr',
      image: 'https://s-media-cache-ak0.pinimg.com/736x/29/fa/14/29fa1441f2a0446e9aa45cee74495a83.jpg',
      age: 1,
      breed: 'Toy',
      description: 'This dog is too cute to be real. Just adorable.'
    }
  ],
  user: [
    {
      name: 'owner',
      type: 'ADOPTER',
      email: 'owner@test.com',
      password: 'test'
    }
  ]
};


db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting seed data");
  return Promise.map(Object.keys(data), name => {
    return Promise.map(data[name], item => {
      return db.model(name).create(item);
    });
  });
})
.then(() => Promise.all([
  db.model('user').findOne({where: {email: 'owner@test.com'}}),
  db.model('pet').findOne({where: {name: 'Snowball'}}),
  db.model('pet').findOne({where: {name: 'Spot'}}),
  db.model('pet').findOne({where: {name: 'Grrr'}})
]))
.then(([user, petOne, petTwo, petThree]) => Promise.all([
  user.addAdopt(petOne),
  user.addAdopt(petTwo),
  user.addAdopt(petThree)
]))
.then(() => {
  console.log("Finished inserting seed data");
})
.catch(console.error.bind(console))
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
