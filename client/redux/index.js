import { combineReducers } from 'redux';
import user from './user';
import pet from './pet';
import userPet from './userPet'

export default combineReducers({
   user,
   pet,
   userPet
});
