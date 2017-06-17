
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
.then(() => {
  console.log("Finished inserting seed data");
})
.catch(console.error.bind(console))
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
