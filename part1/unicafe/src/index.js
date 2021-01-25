import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>)
}

const Statistics = (props) => {
  let statistics = <p>No feedback given</p>
  if (props.all) {
    statistics = (
      <table>
        <tbody>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={props.all} />
            <Statistic text="average" value={props.average} />
            <Statistic text="positive" value={props.positive} />
        </tbody>
      </table>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      {statistics}
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good + neutral + bad) / 3;
  const positive = 100 * good / (good + neutral + bad);

  const goodFeedbackHandler = () => {
    // Set the good state 
    setGood(good + 1);
  }

  const neutralFeedbackHandler = () => {
    // Set the good state
    setNeutral(neutral + 1);
  }

  const badFeedbackHandler = () => {
    // Set the good state
    setBad(bad + 1);
  }

  return (
    <div>
      <section>
        <h1>give feedback</h1>
        <br />
        <Button text='good' 
          handleClick={goodFeedbackHandler} />
        <Button text='neutral' handleClick={neutralFeedbackHandler} />
        <Button text='bad' handleClick={badFeedbackHandler} />
      </section>
      <section>
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          all={all}
          average={average}
          positive={positive} />
      </section>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)