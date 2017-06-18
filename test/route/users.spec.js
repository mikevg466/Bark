const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server');
const agent = request(app);
const User = db.model('user');
const Pet = db.model('pet');

const testUser = {
  name: 'Mike',
  email: 'mike.com',
  password: 'test'
};
const testPetList = [{
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
  }
];


describe('User routes', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {

    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        email: codysEmail
      });
    });

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(codysEmail);
        });
    });

  }); // end describe('/api/users')

  describe('/api/users/interests/:userId', () => {
    let curUser;
    beforeEach('create test user and pets and sets associations', () => {
      db.sync({ force: true })
        .then(() => Promise.all([
          User.create(testUser),
          Pet.create(testPetList[0]),
          Pet.create(testPetList[1]),
          Pet.create(testPetList[2]),
          Pet.create(testPetList[3])
        ]))
        .then(([user, petOne, petTwo, petThree, petFour]) => {
          curUser = user;
          user.addInterest(petOne);
          user.addInterest(petThree);
          user.addInterest(petFour);
        });
    });

    it('GET returns a list of all Pets set to interested for the user', () => {
      return agent.get(`/api/users/interests/${curUser.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          expect(res.body.some(pet => pet.name === testPetList.[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[3].name)).to.equal(true);
        });
    });
    it('POST sets a pet to the interested list for the user', () => {
      return agent.post(`/api/users/interests/${curUser.id}`)
        .send(testPetList[1])
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(4);
          expect(res.body.some(pet => pet.name === testPetList.[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[1].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[3].name)).to.equal(true);
        });
    });
  }); // end describe('/api/users/interests/:userId')

  describe('/api/users/rejects/:userId', () => {
    it('GET returns a list of all Pets set to rejected for the user', () => {
      return agent.get(`/api/users/rejects/${curUser.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          expect(res.body.some(pet => pet.name === testPetList.[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[3].name)).to.equal(true);
        });
    });
    it('POST sets a pet to the rejected list for the user', () => {
      return agent.post(`/api/users/rejects/${curUser.id}`)
        .send(testPetList[1])
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(4);
          expect(res.body.some(pet => pet.name === testPetList.[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[1].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList.[3].name)).to.equal(true);
        });
    });
  }) // end describe('/api/users/rejects/:userId')

}); // end describe('User routes')
