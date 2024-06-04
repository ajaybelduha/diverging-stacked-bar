import Graph from "./Graph";
import "./App.css";

const App = () => {
  const data = [
    {
      twoPlusBelowGradeLevel: 5,
      belowGradeLevel: 3,
      onGradeLevel: 6,
      aboveGradeLevel: 5,
    },
    {
      twoPlusBelowGradeLevel: 4,
      belowGradeLevel: 8,
      onGradeLevel: 7,
      aboveGradeLevel: 0,
    },
    {
      twoPlusBelowGradeLevel: 5,
      belowGradeLevel: 4,
      onGradeLevel: 0,
      aboveGradeLevel: 0,
    },
    {
      twoPlusBelowGradeLevel: 7,
      belowGradeLevel: 2,
      onGradeLevel: 2,
      aboveGradeLevel: 3,
    },
    {
      twoPlusBelowGradeLevel: 1,
      belowGradeLevel: 5,
      onGradeLevel: 1,
      aboveGradeLevel: 6,
    },
    {
      twoPlusBelowGradeLevel: 0,
      belowGradeLevel: 2,
      onGradeLevel: 6,
      aboveGradeLevel: 1,
    },
    {
      twoPlusBelowGradeLevel: 2,
      belowGradeLevel: 2.5,
      onGradeLevel: 2.5,
      aboveGradeLevel: 3,
    },
  ];

  return <div style={{
    background: "#00000011",
    margin: "100px 0",
    maxWidth: "600px"
  }}>
    <Graph data={data} />
  </div>;
};

export default App;
