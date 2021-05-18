import "./styles/reset.css";
import "./styles/App.css";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { selectAll, initButtons } from "./actions/index.js";

import Home from "./components/home.js";
import SingleStudent from "./components/singleStudent.js";
import SelectedStudents from "./components/selectedStudents.js";

import { selectSingle } from "./actions/index.js";

// it's nice to have an App component that's only a table of contents
// but we're gonna mess that up now with the use of the Router
function App() {
  const dispatch = useDispatch();

  const handleClick = (event) => {
    const targetInnerHTML = event.target.innerHTML;
    console.log(targetInnerHTML);
    // call the dispatcher to modify state with the selected student
    dispatch(selectSingle(targetInnerHTML));
  };

  const handleHome = () => {
    // reset a couple of things in student-selection to where we started
    // so if you navigate via home, you'll have an initial state
    // If you don't, you'll keep selection and button-settings
    dispatch(selectAll());
    dispatch(initButtons());
  };

  const studentArray = useSelector((state) => state.studentArray.students);
  const studentLinks = studentArray.map((item) => {
    return (
      <li key={item.name} onClick={handleClick} className="student-li">
        <Link to="/SingleStudent">{item.name}</Link>
      </li>
    );
  });

  return (
    <Router>
      <div className="App">
        <h1>Student Dashboard</h1>
        <nav className="student-links-nav">
          <ul className="student-nav-ul">
            <hr />
            {studentLinks}
            <hr />
            <li>
              <Link to="/SelectedStudents">Selecteer meerdere studenten</Link>
            </li>
            <hr />
            <li>
              <Link onClick={handleHome} to="/">
                Home
              </Link>
            </li>
            <hr />
          </ul>
        </nav>
        <main>
          <Switch>
            <Route path="/SingleStudent">
              <SingleStudent />
            </Route>
            <Route path="/SelectedStudents">
              <SelectedStudents />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
