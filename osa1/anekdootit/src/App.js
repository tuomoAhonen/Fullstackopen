import {React, useState, useEffect} from 'react';

const Button = ({handleClick, text}) => (
  //console.log(handleClick),
  <button onClick={handleClick}>{text}</button>
);

const ShowAnecdoteInformation = ({anecdotes, random}) => {
  return (
    <div>
      <h1>Your daily random quote</h1>
      <p>{anecdotes[random].content}<br/>Votes: {anecdotes[random].votes}</p>
    </div>
  );
};

const MostValuableAnecdote = ({anecdotes}) => {
  let anecdotesVotes = anecdotes.map(anecdote => anecdote.votes);
  let max = Math.max(...anecdotesVotes);
  let maxlist = [];
  
  anecdotes.map((anecdote) => {
    if (anecdote.votes == max) {
      maxlist.push(anecdote.content);
    }
  });

  if(max == 0) {
    return (
      <div></div>
    );
  } else {
    return (
      <div>
        <h1>Anecdote with the most votes</h1>
        {maxlist.map((anecdote, index) => <p>{index + 1}. {anecdote}</p>)}
        <p>Votes acquired: {max}</p>
        {maxlist.length > 1 &&
          <p>SoS! We got a tie situation!</p>
        }
      </div>
    );
  }
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {content: 'If it hurts, do it more often.', votes: 0},
    {content: 'Adding manpower to a late software project makes it later!', votes: 0},
    {content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {content: 'Premature optimization is the root of all evil.', votes: 0},
    {content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {content: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.', votes: 0}
  ]);
  const [random, setRandom] = useState(0);
  const [oldRandom, setOldRandom] = useState(0);

  const setRandomByClick = (random) => {
    if (random == oldRandom) {
      //console.log("on samat numerot");
      //console.log(random);
      //console.log(oldRandom);
      setRandomByClick(Math.floor(Math.random() * (anecdotes.length - 0) + 0));
    } else {
      //console.log("on eri numerot");
      //console.log(random);
      //console.log(oldRandom);
      setRandom(random);
      setOldRandom(random);
    };
  };

  const setVoteForAnectode = () => {
    setAnecdotes(
      anecdotes.map((anecdote, i) => {
        if (i == random) {
          anecdote.votes += 1;
          return anecdote;
        } else {
          return anecdote;
        };
      })
    );
  };

  //console.log("muuttui taas samaksi: ");
  //console.log(random);
  //console.log(oldRandom);

  useEffect(() => {
    //console.log("alustetaan random anectode");
    let firstrandom = Math.floor(Math.random() * (anecdotes.length - 0) + 0);
    setRandom(firstrandom);
    setOldRandom(firstrandom);
  },[]);

  return (
    <div>
      <ShowAnecdoteInformation anecdotes={anecdotes} random={random} />
      <Button handleClick={() => setRandomByClick(Math.floor(Math.random() * (anecdotes.length - 0) + 0))} text={"Give me new random quote, please!"} />
      <Button handleClick={() => setVoteForAnectode()} text={"Vote"} />
      <MostValuableAnecdote anecdotes={anecdotes} />
    </div>
  );
};

export default App;