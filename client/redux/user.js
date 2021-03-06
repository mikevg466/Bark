import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';


// ------ ACTION CREATORS -------
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });


// ------- INIT STATE --------
const defaultUser = {};


// ------- REDUCERS ------------
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}


// -------- DISPATCHERS -----------
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => dispatch(getUser(res.data || defaultUser)));

export const auth = (email, password, method, type) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, type })
      .then(res => {
        dispatch(getUser(res.data));
        browserHistory.push('/');
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser());
        browserHistory.push('/login');
      })
      .catch(err => console.log(err));
