import {React, useState} from 'react';

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  console.log(props);
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.statistics.good} />
          <StatisticsLine text="neutral" value={props.statistics.neutral} />
          <StatisticsLine text="bad" value={props.statistics.bad} />
          <StatisticsLine text="all" value={props.statistics.all.length} />
          <StatisticsLine text="average" value={props.statistics.averageScore.toFixed(2)} />
          <StatisticsLine text="positive" value={props.statistics.positive.toFixed(2)+"%"} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: [],
    averages: [],
    averageScore: 0,
    positive: 0,
  });

  const setAverageScore = (newAverage, averages, allLength) => {
    let average = 0;
    average += newAverage;
    console.log(newAverage);
    console.log(averages);
    console.log(allLength);
  
    for (let i=0; i<averages.length; i++) {
      average = average + averages[i];
    };
  
    return average / (allLength);
  };

  const setFeedback = (text) => {
    if (text === 'good') {
      setStatistics({
        ...statistics, 
        good: statistics.good + 1, all: statistics.all.concat(text), 
        averages: statistics.averages.concat(1), 
        averageScore: setAverageScore(1, statistics.averages, statistics.all.length + 1), 
        positive: (statistics.good +1) / (statistics.all.length + 1) * 100
      });
    } else if (text === 'neutral') {
      setStatistics({
        ...statistics, 
        neutral: statistics.neutral + 1, all: statistics.all.concat(text), 
        averages: statistics.averages.concat(0), 
        averageScore: setAverageScore(0, statistics.averages, statistics.all.length + 1), 
        positive: statistics.good / (statistics.all.length + 1) * 100
      });
    } else if (text === 'bad') {
      setStatistics({
        ...statistics, 
        bad: statistics.bad + 1, 
        all: statistics.all.concat(text), 
        averages: statistics.averages.concat(-1), 
        averageScore: setAverageScore(-1, statistics.averages, statistics.all.length + 1), 
        positive: statistics.good / (statistics.all.length + 1) * 100
      });
    };
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setFeedback("good")} text="good" />
      <Button handleClick={() => setFeedback("neutral")} text="neutral" />
      <Button handleClick={() => setFeedback("bad")} text="bad" />
      <h1>Feedback statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;
