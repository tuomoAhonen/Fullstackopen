const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Content = ({ parts }) => 
	<div>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</div>;


const Total = ({ parts }) => {
  //console.log(parts, "This is total");
  /*const total = parts.map((parts) => parts.exercises).reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );*/
  /*const total = numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );*/
  //console.log(total);
  return (
    <p>
      <b>
        Total of exercises: {
        	parts
          .map((parts) => parts.exercises)
          .reduce((previousValue, currentValue) => previousValue + currentValue)
        }
      </b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
