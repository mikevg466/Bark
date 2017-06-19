const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server');
const agent = request(app);
const User = db.model('user');
const Pet = db.model('pet');
const PetInterest = require('../../server/db/models/pet_interest');

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
    let curUser, nextPet;
    beforeEach('create test user and pets and sets associations', () => {
      return db.sync({ force: true })
        .then(() => Promise.all([
          User.create(testUser),
          Pet.create(testPetList[0]),
          Pet.create(testPetList[1]),
          Pet.create(testPetList[2]),
          Pet.create(testPetList[3])
        ]))
        .then(([user, petOne, petTwo, petThree, petFour]) => {
          curUser = user;
          nextPet = petTwo;
          return Promise.all([
            user.addInterest(petOne),
            user.addInterest(petThree),
            user.addInterest(petFour)
          ]);
        });
    });

    it('GET returns a list of all Pets set to interested for the user', () => {
      return agent.get(`/api/users/interests/${curUser.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          expect(res.body.some(pet => pet.name === testPetList[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[3].name)).to.equal(true);
        });
    });
    it('POST sets a pet to the interested list for the user', () => {
      return agent.post(`/api/users/interests/${curUser.id}`)
        .send(nextPet)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(4);
          expect(res.body.some(pet => pet.name === testPetList[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[1].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[3].name)).to.equal(true);
        });
    });
  }); // end describe('/api/users/interests/:userId')

  describe('/api/users/interests/:userId/basic/messages', () => {
    let curUser, nextPet, testOne, testThree, testFour;
    beforeEach('create test user and pets and sets associations', () => {
      return db.sync({ force: true })
        .then(() => Promise.all([
          User.create(testUser),
          Pet.create(testPetList[0]),
          Pet.create(testPetList[1]),
          Pet.create(testPetList[2]),
          Pet.create(testPetList[3])
        ]))
        .then(([user, petOne, petTwo, petThree, petFour]) => {
          curUser = user;
          nextPet = petTwo;
          testOne = petOne;
          testThree = petThree;
          testFour = petFour;
          return Promise.all([
            user.addInterest(petOne),
            user.addInterest(petThree),
            user.addInterest(petFour)
          ]);
        })
        .then(() => PetInterest.findAll())
        .then(petInterestList => Promise.all([
          petInterestList[0].update({user_message: true}),
          petInterestList[2].update({user_message: true})
        ]));
    });

    it('GET returns a list of all pets that the user sent messages to', () => {
      return agent.get(`/api/users/interests/${curUser.id}/basic/messages`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(2);
          expect(res.body.some(pet => pet.petId === testOne.id)).to.equal(true);
          expect(res.body.some(pet => pet.petId === testFour.id)).to.equal(true);
        })
    });
    it('POST sets a message flag on the pet_interests association model', () => {
      return agent.post(`/api/users/interests/${curUser.id}/basic/messages`)
        .send(testThree)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          expect(res.body.some(pet => pet.petId === testOne.id)).to.equal(true);
          expect(res.body.some(pet => pet.petId === testFour.id)).to.equal(true);
          expect(res.body.some(pet => pet.petId === testThree.id)).to.equal(true);
        })
    })
  }); // end describe('/api/users/interests/:userId/basic/messages')

  describe('/api/users/rejects/:userId', () => {
    let curUser, nextPet;
    beforeEach('create test user and pets and sets associations', () => {
      return db.sync({ force: true })
        .then(() => Promise.all([
          User.create(testUser),
          Pet.create(testPetList[0]),
          Pet.create(testPetList[1]),
          Pet.create(testPetList[2]),
          Pet.create(testPetList[3])
        ]))
        .then(([user, petOne, petTwo, petThree, petFour]) => {
          curUser = user;
          nextPet = petTwo;
          return Promise.all([
            user.addReject(petOne),
            user.addReject(petThree),
            user.addReject(petFour)
          ]);
        });
    });

    it('GET returns a list of all Pets set to rejected for the user', () => {
      return agent.get(`/api/users/rejects/${curUser.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          expect(res.body.some(pet => pet.name === testPetList[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[3].name)).to.equal(true);
        });
    });
    it('POST sets a pet to the rejected list for the user', () => {
      return agent.post(`/api/users/rejects/${curUser.id}`)
        .send(nextPet)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(4);
          expect(res.body.some(pet => pet.name === testPetList[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[1].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[3].name)).to.equal(true);
        });
    });
  }); // end describe('/api/users/rejects/:userId')

  describe('/api/users/adoptions/:userId', () => {
    let curUser, nextPet;
    beforeEach('create test user and pets and sets associations', () => {
      return db.sync({ force: true })
        .then(() => Promise.all([
          User.create(testUser),
          Pet.create(testPetList[0]),
          Pet.create(testPetList[1]),
          Pet.create(testPetList[2]),
          Pet.create(testPetList[3])
        ]))
        .then(([user, petOne, petTwo, petThree, petFour]) => {
          curUser = user;
          nextPet = petTwo;
          return Promise.all([
            user.addAdopt(petOne),
            user.addAdopt(petThree),
            user.addAdopt(petFour)
          ]);
        });
    });

    it('GET returns a list of all Pets set to adoptable by the user', () => {
      return agent.get(`/api/users/adoptions/${curUser.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          expect(res.body.some(pet => pet.name === testPetList[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[3].name)).to.equal(true);
        });
    });
    it('POST sets a pet to the adoption list for the user', () => {
      return agent.post(`/api/users/adoptions/${curUser.id}`)
        .send(nextPet)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(4);
          expect(res.body.some(pet => pet.name === testPetList[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[1].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[2].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === testPetList[3].name)).to.equal(true);
        })
    });
  }); // describe('/api/users/adoptions/:userId')

  describe('/api/users/interest/users/:petId', () => {
    let curUser, testOne, curPetInterest;
    beforeEach('create test user and pets and sets associations', () => {
      return db.sync({ force: true })
        .then(() => Promise.all([
          User.create(testUser),
          User.create({
            name: 'secondMike',
            email: 'secondMike.com',
            password: 'test'
          }),
          Pet.create(testPetList[0])
        ]))
        .then(([user, userTwo, petOne]) => {
          curUser = user;
          testOne = petOne;
          return Promise.all([
            user.addInterest(petOne),
            userTwo.addInterest(petOne)
          ]);
        })
        .then(() => PetInterest.findOne({ where: { userId: curUser.id } }))
        .then(petInterest => {
          curPetInterest = petInterest;
          return petInterest.update({user_message: true})
        });
    });

    it('GET returns an array of users that left messages', () => {
      return agent.get(`/api/users/interest/users/${testOne.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(1);
          expect(res.body[0].userId).to.equal(curPetInterest.userId);
          expect(res.body[0].petId).to.equal(curPetInterest.petId);
          expect(res.body[0].userName).to.equal(curUser.name);
        });
    });

  }); // end describe('/api/users/interest/users/:petId')

}); // end describe('User routes')
