import studentDataReducer from "./studentDataReducer.js";
import studentArrayReducer from "./studentArrayReducer.js";
import selectButtonsReducer from "./selectButtonsReducer.js";

import {combineReducers} from 'redux'

const allReducers = combineReducers({
  studentData: studentDataReducer,
  studentArray: studentArrayReducer,
  selectButtons: selectButtonsReducer,
})

export default allReducers;