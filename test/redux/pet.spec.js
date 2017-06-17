import { expect } from 'chai';
import { createStore } from 'redux';
import petReducer from '../../client/redux/pet';
import { fetchPets } from '../../client/redux/pet';
const db = require('../../server/db');
const Pet = require('../../server/db/models/pet');

describe('Pet reducer', () => {

  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(petReducer);
  });

  const testPetList = [
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
    }
  ];
  before('Load db with test data', () => {
    return db.sync({ force: true })
      .then(() => Promise.all([
        Pet.create(testPetList[0]),
        Pet.create(testPetList[1])
      ]))
  });

  it('has expected initial state', () => {
    expect(testStore.getState()).to.be.deep.equal({
      petList: [],
      selectedPet: {},
    });
  });

  describe('LOAD_PETS', () => {
    it('sets the petList to the input array', () => {
      testStore.dispatch({ type: 'LOAD_PETS', petList: [{ name: 'Twitch' }, { name: 'Twitch Jr' }] });
      const newState = testStore.getState();
      expect(newState.petList[0]).to.deep.equal({ name: 'Twitch' });
      expect(newState.petList[1]).to.deep.equal({ name: 'Twitch Jr' });
    });
    it('loads all pets using the /api/pets route', () => {
      return testStore.dispatch(fetchPets())
        .then(() => {
          const newState = testStore.getState();
          testPetList.forEach((pet, idx) => {
            Object.keys(pet).forEach(key => {
              expect(newState.petList[idx][key]).to.equal(pet[key]);
            });
          });
        });
    });
  }); // end describe('LOAD_PETS')

  describe('SELECT_PET', () => {
    it('sets the selectedPet to the input object', () => {
      testStore.dispatch({ type: 'SELECT_PET', selectedPet: { name: 'Twitch Jr' } });
      const newState = testStore.getState();
      expect(newState.selectedPet).to.deep.equal({ name: 'Twitch Jr' });
    });
  }); // end describe('SELECT_PET')

}); // end describe('Pet reducer')
