import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup,
  VictoryLabel,
} from "victory";
import { selectDif, selectJoy } from "./../actions/index.js";

import "./../styles/graphContainer.css";

const GraphContainer = () => {
  const dispatch = useDispatch();
  const selectButtons = useSelector((state) => state.selectButtons);

  // --------------------------------------------------------------------------
  // prepare data for the graph
  // --------------------------------------------------------------------------
  const studentData = useSelector((state) => state.studentData.studentData);

  // we could do all this logic in the studentDataReducer but it ended up here

  // first we're gonna filter the studentData for students that are or are not selected
  // selectedStudents can be found in state, we just have to create an array for them
  const selectedStudents = useSelector((state) => state.studentArray.students)
    .filter((item) => item.selected)
    .map((item) => item.name);
  const numberOfSelectedStudents = selectedStudents.length;

  const selectedStudentData = studentData.filter((item) => {
    return selectedStudents.includes(item.student);
  });

  // then we're gonna map our filterd studentData to a managable form for the graphic
  // we've already created a set with the assignments and put in into state
  const assignmentArray = useSelector(
    (state) => state.studentData.assignmentArray
  );

  const resultArray = [];
  assignmentArray.forEach((a) => {
    // filter the results for this assignment and add the difficulty-grades
    const sumDif = selectedStudentData
      .filter((as) => as.assignment === a)
      .reduce(
        (currentTotal, assignment) =>
          currentTotal + parseInt(assignment.difficulty),
        0
      );

    // the same for the enjoyment-grades
    // could we do this in one go, the dif and the joy grades?
    const sumJoy = selectedStudentData
      .filter((ass) => ass.assignment === a)
      .reduce(
        (currentTotal, assignment) =>
          currentTotal + parseInt(assignment.enjoyment),
        0
      );

    // watch out for division by zero
    // and to avoid some horrible errors on the console, we have to add the nested ternary operator on the selectButtons
    // We did this in the VictoryBar props but that's not the way to go
    const result = {
      assignment: a,
      resultDif:
        // numberOfSelectedStudents === 0 ? 0 : sumDif / numberOfSelectedStudents,
        numberOfSelectedStudents === 0 ? 0 : (selectButtons.dif ? sumDif / numberOfSelectedStudents : 0),
      resultJoy:
        // numberOfSelectedStudents === 0 ? 0 : sumJoy / numberOfSelectedStudents,
        numberOfSelectedStudents === 0 ? 0 : (selectButtons.joy ? sumJoy / numberOfSelectedStudents : 0),
    };

    resultArray.push(result);
  });

  // --------------------------------------------------------------------------
  // and we're done preparing data for the graph
  // --------------------------------------------------------------------------

  const handleSelectChange = (event) => {
    const targetHtmlFor = event.target.htmlFor;
    if (targetHtmlFor === "selectDif") {
      dispatch(selectDif());
    } else if (targetHtmlFor === "selectJoy") {
      dispatch(selectJoy());
    }
  };

  const graphSelectButtons = (
    <div className="select-buttons-div">
      <label
        className="label-checkbox"
        htmlFor="selectDif"
        key="1"
        onClick={handleSelectChange}
      >
        <input
          id="selectDifButton"
          name="selectDif"
          type="checkbox"
          checked={selectButtons.dif}
          onChange={handleSelectChange}
        ></input>
        <span>Toon moeilijkheid</span>
      </label>

      <label
        className="label-checkbox"
        htmlFor="selectJoy"
        key="2"
        onClick={handleSelectChange}
      >
        <input
          id="selectJoyButton"
          name="selectJoy"
          type="checkbox"
          checked={selectButtons.joy}
          onChange={handleSelectChange}
        ></input>
        <span>Toon plezier</span>
      </label>
    </div>
  );

  return (
    <div className="graph-container-view">
      <VictoryChart
        height={500}
        width={1000}
        domain={{ y: [0, 5] }}
        padding={{ top: 20, right: 20, bottom: 180, left: 40 }}
        domainPadding={10}
        theme={VictoryTheme.material}
        style={{
          parent: { border: "1px solid #ccc", paddingBottom: "20px" },
        }}
      >
        <VictoryAxis
          tickFormat={(t) => t.padEnd(33, ".")} // spaces don't work here , they're collapsed, somehow
          style={{
            tickLabels: {
              fontSize: 10,
              fontFamily: "Courier",
              fontWeight: "bold",
              padding: 100,
            },
          }}
          tickLabelComponent={<VictoryLabel angle={90} />}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 10, fontWeight: "bold", padding: 10 },
          }}
        />
        <VictoryGroup>
          <VictoryBar
            style={{ data: { fill: "deepskyblue" } }}
            alignment="end"
            barWidth={4}
            data={resultArray}
            x="assignment"
            y="resultDif"
          />
          <VictoryBar
            style={{ data: { fill: "aquamarine" } }}
            alignment="start"
            barWidth={4}
            data={resultArray}
            x="assignment"
            y="resultJoy"
          />
        </VictoryGroup>
      </VictoryChart>
      {graphSelectButtons}
    </div>
  );
};

export default GraphContainer;
