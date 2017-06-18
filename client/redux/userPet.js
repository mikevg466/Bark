import axios from 'axios';

//------- ACTIONS -------
const GET_INTEREST_PETS = 'GET_INTEREST_PETS';
const GET_REJECT_PETS = 'GET_REJECT_PETS';
const ADD_INTEREST_PET = 'ADD_INTEREST_PET';
const ADD_REJECT_PET = 'ADD_REJECT_PET';


// ------ ACTION CREATORS -------
const getInterestPets = interestList => ({ type: GET_INTEREST_PETS, interestList: interestList || [] });
const getRejectPets = rejectList => ({ type: GET_REJECT_PETS, rejectList: rejectList || [] });
const addInterestPet = selectedPet => ({ type: ADD_INTEREST_PET, selectedPet });
const addRejectPet = selectedPet => ({ type: ADD_REJECT_PET, selectedPet });


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

    case GET_REJECT_PETS:
      newState.rejectList = action.rejectList;
      break;

    case ADD_INTEREST_PET:
      newState.interestList = newState.interestList.slice(0);
      newState.interestList.push(action.selectedPet);
      break;

    case ADD_REJECT_PET:
      newState.rejectList = newState.rejectList.slice(0);
      newState.rejectList.push(action.selectedPet);
      break;

    default:
      return state;

  }

  return newState;
}


// -------- DISPATCHERS -----------
export const fetchInterests = () =>
  (dispatch, getState) => {
    const user = getState().user;
    return axios.get(`/api/users/interests/${user.id}`)
      .then(res => dispatch(getInterestPets(res.data)))
      .catch(console.error.bind(console));
  }

export const fetchRejects = () =>
  (dispatch, getState) => {
    const user = getState().user;
    return axios.get(`/api/users/rejects/${user.id}`)
      .then(res => dispatch(getRejectPets(res.data)))
      .catch(console.error.bind(console));
  }

export const addInterest = () =>
  (dispatch, getState) => {
    const user = getState().user;
    const { selectedPet } = getState().pet;
    return axios.post(`/api/users/interests/${user.id}`, selectedPet)
      .then(res => dispatch(getInterestPets(res.data)))
      .catch(console.error.bind(console));
  }

export const addReject = () =>
  (dispatch, getState) => {
    const user = getState().user;
    const { selectedPet } = getState().pet;
    return axios.post(`/api/users/rejects/${user.id}`, selectedPet)
      .then(res => dispatch(getRejectPets(res.data)))
      .catch(console.error.bind(console));
  }
