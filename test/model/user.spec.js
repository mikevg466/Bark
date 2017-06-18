const { expect } = require('chai');
const db = require('../../server/db');
const User = db.model('user');
const Pet = db.model('pet');

describe('User model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Pet associations', () => {
    let mike, petList;
    const testList = [
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
      }
    ]
    beforeEach('load Pets and a User', () => {
      return Promise.all([
        User.create({
          name: 'Mike',
          email: 'mike.com',
          password: 'test'
        }),
        Pet.create(testList[0]),
        Pet.create(testList[1]),
        Pet.create(testList[2]),
      ])
        .then(([user, petOne, petTwo, petThree]) => {
          mike = user;
          petList = [petOne, petTwo, petThree];
        });
    });

    it('User can associate to pets they\'re interested in', () => {
      return Promise.all([
        mike.addInterest(petList[0]),
        mike.addInterest(petList[2])
      ])
        .then(() => mike.getInterest())
        .then(interestList => {
          expect(interestList).to.be.an('array');
          expect(interestList).to.have.a.lengthOf(2);
          expect(interestList[0].name).to.equal(petList[0].name);
          expect(interestList[1].name).to.equal(petList[2].name);
        });
    });
    it('User can associate to pets they\'re not interested in', () => {
      return Promise.all([
        mike.addReject(petList[1]),
        mike.addReject(petList[2])
      ])
        .then(() => mike.getReject())
        .then(rejectList => {
          expect(rejectList).to.be.an('array');
          expect(rejectList).to.have.a.lengthOf(2);
          expect(rejectList[0].name).to.equal(petList[1].name);
          expect(rejectList[1].name).to.equal(petList[2].name);
        });
    });

    it('User can associate to pets they set as adoptable', () => {
      return Promise.all([
        mike.addAdopt(petList[1]),
        mike.addAdopt(petList[2])
      ])
        .then(() => mike.getAdopt())
        .then(adoptionList => {
          expect(adoptionList).to.be.an('array');
          expect(adoptionList).to.have.a.lengthOf(2);
          expect(adoptionList[0].name).to.equal(petList[1].name);
          expect(adoptionList[1].name).to.equal(petList[2].name);
        });
    });
  }); // end describe('Pet associations');

  describe('instanceMethods', () => {

    describe('correctPassword', () => {

      let cody;

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user;
          });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });

    }); // end describe('correctPassword')

  }); // end describe('instanceMethods')

}); // end describe('User model')
