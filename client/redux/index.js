import { combineReducers } from 'redux';
import user from './user';
import pet from './pet';

export default combineReducers({
   user,
   pet,
});
