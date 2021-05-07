import studentData from "./../assets/studentData.js"

// first we make a set and an array of all the courses
let assignmentSet = new Set( studentData.map(item => item.assignment));
let assignmentArray = Array.from(assignmentSet);
assignmentArray.sort();

// for testing, let's trim the array
// assignmentArray = assignmentArray.slice( 0,20);

const initialState = {
  studentData: studentData,
  assignmentArray: assignmentArray,
}

const studentDataReducer = (state = initialState, action) => {
  return state;
}

export default studentDataReducer;
