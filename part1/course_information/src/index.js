import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {

    const parts = props.parts.map(part => {
      return <Part key={part.name} part={part.name} exercises={part.exercises} />
    })
      return (
        <div>
          {parts}
        </div>
      );
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  );
}

const Total = (props) => {
  const exercisesArray = props.parts.map(part => part.exercises);
  const total = exercisesArray.reduce((acc, currrent_value) => {
    return acc + currrent_value
  }, 0);
  return <p>Number of exercises {total}</p>
}

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
    <div>
      <Header course={course.name} />
      <Content 
          parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))