import Course from "./components/Course";

/*
const Header = (props) => {
  console.log(props);
  return <div><h2>{props.name}</h2></div>;
};

const Part = ({part}) => <p>{part.name} {part.exercises}</p>;

const Content = ({parts}) => {
  console.log(parts, "parts here");
  return (
    <div>
      {
        parts.map(part => <Part key={part.id} part={part} />)
      }
    </div>
  );
};

const Total = ({parts}) => {
  console.log(parts, "This is total");
  const numbers = parts.map(parts => parts.exercises);
  const total = numbers.reduce((previousValue, currentValue) => previousValue + currentValue);
  console.log(total);
  return (
    <p><b>Total of exercises: {total}</b></p>
  );
};

const Course = ({course}) => {
  console.log(course, "this is courses");
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
*/

const App = () => {
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          id: 1,
          name: "Fundamentals of React",
          exercises: 10,
        },
        {
          id: 2,
          name: "Using props to pass data",
          exercises: 7,
        },
        {
          id: 3,
          name: "State of a component",
          exercises: 14,
        },
        {
          id: 4,
          name: "Redux",
          exercises: 11,
        },
      ],
    },
    {
      id: 2,
      name: "Node.js",
      parts: [
        {
          id: 1,
          name: "Routing",
          exercises: 3,
        },
        {
          id: 2,
          name: "Middlewares",
          exercises: 7,
        },
      ],
    },
  ];

  return (
    <div className="App">
      <h1>Web development curriculm</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
