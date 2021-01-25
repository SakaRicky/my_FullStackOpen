import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [current, setCurrent] = useState(0);

  // Create an array made of the number of anecdotes and fill it with 0,s
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [highestVote, setHighestVote] = useState(new Array(2).fill(0));

  // console.log("Votes: ", votes);

  // Randomly selects the index of the Anecdote to display sets it to the state
  const selectNextAnecdot = () => {
    const selectedIndex = Math.round(Math.random() * (anecdotes.length - 1));
    setCurrent(selectedIndex);
    setSelected(selectedIndex);
  }

  // Sets the value of the number of votes of an anecdot to +1
  // If this anecdote has the highest votes, set as anecdote with highest votes
  const setVote = () => {
    const newVotes = [...votes];
    newVotes[current] += 1;
    const newHighestVote = [...highestVote];
    if (newVotes[current] > newHighestVote[0]) {
      console.log("setting highest vote");
      newHighestVote[0] = newVotes[current];
      newHighestVote[1] = current;
    }

    setHighestVote(newHighestVote);
    setVotes(newVotes);
  }

  let anecdoteWithMostVotes = highestVote[0] !== 0 ? (<div>
                                                          <p>{props.anecdotes[highestVote[1]]}</p>
                                                          <p>has {votes[highestVote[1]]}</p>
                                                        </div>
                                                      ) : <p>No anecdote has been voted yet</p>


  return (
    <div>
      <section>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>
          <Button text="vote" handleClick={setVote} />
          <Button text="next anecdote" handleClick={selectNextAnecdot} />
        </p>
      </section>

      <section>
        <h1>Anecdote with most votes</h1>
        {anecdoteWithMostVotes}
      </section>
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)