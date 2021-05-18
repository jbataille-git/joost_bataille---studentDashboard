// maybe this reducer belongs in studentDataReducer.js
// but as of now, I think it can be separate
// because the dataReducer always returns all data
// and only the graphContainer is interested in what to show and not to show
// so for the moment it stays here

const initialState = {
  dif: true,
  joy: false
}

const selectButtonsReducer = ( state = initialState, action) => {
  switch(action.type){
    case "SELECT_DIF":
      return { ...state, dif: !state.dif};
    case "SELECT_JOY":
      return { ...state, joy: !state.joy};
    case "INIT_BUTTONS":
      return initialState;
    default:
      return state;
    }
}

export default selectButtonsReducer;