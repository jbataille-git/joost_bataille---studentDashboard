import React from "react";

import "./../styles/studentList.css";

import StudentList from "./studentList.js";
import GraphContainer from "./graphContainer.js";

const SelectedStudents = () => {
  return (
    <div className="selected-students-view">
      <GraphContainer />
      <StudentList />
    </div>
  );
};

export default SelectedStudents;
