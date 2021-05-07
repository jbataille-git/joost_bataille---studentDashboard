import React from "react";
import "./styles/reset.css"
import "./styles/App.css"

import StudentList from "./components/studentList.js"
import GraphContainer from "./components/graphContainer.js";

function App() {

  return (
    <div className="App">
      <h1>Student Dashboard</h1>
      <GraphContainer />
      <StudentList />
    </div>
  );
}

export default App;
