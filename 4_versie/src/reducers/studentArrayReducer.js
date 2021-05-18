import studentData from "./../assets/studentData.js";

// for starters,
// let's make a student list from our raw data
const studentSet = new Set(studentData.map((item) => item.student));
// and then we need to turn it into an array to sort and map later on
const studentArray = Array.from(studentSet);
studentArray.sort();

// we need a extra flag with every student so we have to do some construction-work
// this HAS to be a 'let' variable because we do a re-assignment in case 'SELECT ALL' and case 'SELECT NONE'
let newStudentArray = [];
studentArray.forEach((item) => {
  const student = { name: item, selected: true };
  newStudentArray.push(student);
});

const initialState = {
  students: newStudentArray,
  allSelected: true,
  noneSelected: false,
};

const studentArrayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_ONE":
      const selectOneStudentArray = state.students.map((item) => {
        if (item.name === action.payload) {
          item.selected = !item.selected;
        }
        return item;
      });

      // we need to reset the selectAll and SelectNone buttons
      return {
        ...state,
        students: selectOneStudentArray,
        allSelected: false,
        noneSelected: false,
      };

      case "SELECT_SINGLE":
        const selectSingleStudentArray = state.students.map((item) => {
          if (item.name === action.payload) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        });
  
        return {
          ...state,
          students: selectSingleStudentArray,
          allSelected: false,
          noneSelected: false,
          };
  
      case "SELECT_ALL":
      newStudentArray = state.students.map((item) => {
        item.selected = true;
        return item;
      });

      return {
        ...state,
        students: newStudentArray,
        allSelected: true,
        noneSelected: false,
      };

    case "SELECT_NONE":
      newStudentArray = state.students.map((item) => {
        item.selected = false;
        return item;
      });

      return {
        ...state,
        students: newStudentArray,
        allSelected: false,
        noneSelected: true,
      };

    default:
      return state;
  }
};

export default studentArrayReducer;
