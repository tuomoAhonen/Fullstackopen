const Header = (props) => {
  console.log(props);
  return <div><h1>{props.name}</h1></div>;
};

/*
const Content = () => {
  return (
    <div>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </div>
  );
};

const Total = () => {
  return (
    <div>
      
    </div>
  );
};
*/

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div className="App">
      <Header name={course.name} />
      {/* 
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      */}
    </div>
  );
};

export default App;