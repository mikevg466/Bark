import axios from 'axios';

//------- ACTIONS -------
const GET_INTEREST_PETS = 'GET_INTEREST_PETS';
const GET_REJECT_PETS = 'GET_REJECT_PETS';
const ADD_INTEREST_PET = 'ADD_INTEREST_PET';
const ADD_REJECT_PET = 'ADD_REJECT_PET';


// ------ ACTION CREATORS -------
const getInterestPets = interestList => ({ type: GET_INTEREST_PETS, interestList: interestList || [] });
const getRejectPets = rejectList => ({ type: GET_REJECT_PETS, rejectList: rejectList || [] });


// ------- INIT STATE --------
const initState = {
  interestList: [],
  rejectList: [],
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_INTEREST_PETS:
      newState.interestList = action.interestList;
      break;

    case REMOVE_USER:
      newState.rejectList = action.rejectList;
      break;

    default:
      return state;

  }
}


// -------- DISPATCHERS -----------
