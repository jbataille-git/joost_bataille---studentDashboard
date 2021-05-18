import React from "react";
import { useSelector } from "react-redux";

import GraphContainer from "./graphContainer.js"


const SingleStudent = () => {

  const selectedStudent = useSelector((state) => state.studentArray.students)
    .filter((item) => item.selected)
    .map((item) => item.name);

  return (
    <div className="single-student-view">
      <h1>Gegevens van {selectedStudent}</h1>
      <GraphContainer />
    </div>
  )
};

export default SingleStudent;