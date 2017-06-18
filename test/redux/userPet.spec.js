import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import userPetReducer from '../../client/redux/userPet';
import {  } from '../../client/redux/userPet';
import thunkMiddleware from 'redux-thunk';

describe('UserPet reducer', () => {

  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(userPetReducer, applyMiddleware(thunkMiddleware));
  });

  it('has expected initial state', () => {
    expect(testStore.getState()).to.be.deep.equal({
      interestList: [],
      rejectList: [],
    });
  });

  describe('GET_INTEREST_PETS', () => {
    it('sets the interestList to the input array', () => {
      testStore.dispatch({ type: 'GET_INTEREST_PETS', interestList: [{ name: 'Twitch' }, { name: 'Twitch Jr' }] });
      const newState = testStore.getState();
      expect(newState.interestList[0]).to.deep.equal({ name: 'Twitch' });
      expect(newState.interestList[1]).to.deep.equal({ name: 'Twitch Jr' });
    });
  }); // end describe('LOAD_PETS')

  describe('GET_REJECT_PETS', () => {
    it('sets the rejectList to the input array', () => {
      testStore.dispatch({ type: 'GET_REJECT_PETS', rejectList: [{ name: 'Twitch' }, { name: 'Twitch Jr' }] });
      const newState = testStore.getState();
      expect(newState.rejectList[0]).to.deep.equal({ name: 'Twitch' });
      expect(newState.rejectList[1]).to.deep.equal({ name: 'Twitch Jr' });
    });
  }); // end describe('SELECT_PET')

  describe('ADD_INTEREST_PET', () => {
    it('Adds an input object to the interestList', () => {
      testStore.dispatch({ type: 'GET_INTEREST_PETS', interestList: [{ name: 'Twitch' }] });
      const newState = testStore.getState();
      expect(newState.interestList).to.have.a.lengthOf(1);

      testStore.dispatch({ type: 'ADD_INTEREST_PET', selectedPet: { name: 'Twitch Jr' } });
      const newState = testStore.getState();
      expect(newState.interestList).to.have.a.lengthOf(1);
      expect(newState.interestList[0]).to.deep.equal({ name: 'Twitch' });
      expect(newState.interestList[1]).to.deep.equal({ name: 'Twitch Jr' });
    });
  }); // end describe('ADD_INTEREST_PET')

  describe('ADD_REJECT_PET', () => {
    it('Adds an input object to the rejectList', () => {
      testStore.dispatch({ type: 'ADD_REJECT_PET', interestList: [{ name: 'Twitch' }] });
      const newState = testStore.getState();
      expect(newState.rejectList).to.have.a.lengthOf(1);

      testStore.dispatch({ type: 'ADD_INTEREST_PET', selectedPet: { name: 'Twitch Jr' } });
      const newState = testStore.getState();
      expect(newState.rejectList).to.have.a.lengthOf(1);
      expect(newState.rejectList[0]).to.deep.equal({ name: 'Twitch' });
      expect(newState.rejectList[1]).to.deep.equal({ name: 'Twitch Jr' });
    });
  }); // end describe('ADD_REJECT_PET')

}); // end describe('Pet reducer')
