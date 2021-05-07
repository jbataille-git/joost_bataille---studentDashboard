import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import {selectOne, selectAll, selectNone} from "./../actions/index.js"

import "./../styles/studentList.css"

const StudentList = () => {

  const dispatch = useDispatch();
  const studentArray = useSelector(state => state.studentArray.students);

  // we need to call an action and a reducer
  // to set students to selected or not-selected
  // the event fires on the label, not on the checkbox
  // so we look a little deeper
  const handleLabelChange = (event) => {
    const value = event.target.lastChild.innerHTML;
    dispatch(selectOne(value));
  };

  const studentArrayList = studentArray.map( item => {
    return  <label 
              className="label-checkbox"
              htmlFor="studentName"
              key={item.name}
              onClick={handleLabelChange}
            >
              <input
                // id="studentName" this causes trouble!
                name="studentName"
                type="checkbox"
                checked={item.selected}
                value={item.name}
                onChange={handleLabelChange}
              >
              </input>
              <span>
                {item.name}
              </span>
            </label>
  })

  const handleSelectChange = (event) => {
    const targetHtmlFor = event.target.htmlFor;
    if (targetHtmlFor === "selectAll") {
      dispatch(selectAll());
    } else if (targetHtmlFor === "selectNone") {
      dispatch(selectNone());
    };
  };

  const studentSelectButtons = 
    <div
      className="select-buttons-div"
    >
      <label
        className="label-checkbox"
        htmlFor="selectAll"
        key="1"
        onClick={handleSelectChange}
      >
        <input
          id="selectAllButton"
          name="selectAll"
          type="checkbox"
          checked={useSelector(state => state.studentArray.allSelected)}
          onChange={handleSelectChange}
        >
        </input>
        <span>
          Selecteer iedereen
        </span>
      </label>
      
      <label 
        className="label-checkbox"
        htmlFor="selectNone"
        key="2"
        onClick={handleSelectChange}
      >
        <input
          id="selectNoneButton"
          name="selectNone"
          type="checkbox"
          checked={useSelector(state => state.studentArray.noneSelected)}
          onChange={handleSelectChange}
        >
        </input>
        <span>
          Selecteer niemand
        </span>
      </label>   

    </div>;

  return (
    <div className="student-list-view">
        { studentArrayList }
        { studentSelectButtons }
    </div>
  );

};

export default StudentList;