import axios from 'axios';

//------- ACTIONS -------
const LOAD_PETS = 'LOAD_PETS';
const SELECT_PET = 'SELECT_PET';


// ------ ACTION CREATORS -------
const loadPets = petList => ({ type: LOAD_PETS, petList: petList || [] });
const selectPet = selectedPet => ({ type: SELECT_PET, selectedPet: selectedPet || {} });

// ------- INIT STATE --------
const initState = {
  petList: [],
  selectedPet: {},
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case LOAD_PETS:
      newState.petList = action.petList;
      break;

    case SELECT_PET:
      newState.selectedPet = action.selectedPet;
      break;

    default:
      return state;

  }

  return newState;
}


// -------- DISPATCHERS -----------
export const fetchPets = () =>
  dispatch =>
    axios.get('/api/pets')
      .then(res => dispatch(loadPets(res.data)))
      .catch(console.error.bind(console));

export const selectRandomPet = () =>
  (dispatch, getState) =>
    {
      const { petList } = getState().pet;
      dispatch(selectPet(petList[Math.floor(Math.random() * petList.length)]));
    }
