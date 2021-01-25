import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
const Total = ({ course }) => {
  const sum = course.parts.map(part => {
    return part.exercises
  }).reduce((acc,currentValue) => {
    return acc + currentValue
  });
  return(
    <p style={{fontWeight: "bold"}}>Number of exercises {sum}</p>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  const content = course.parts.map(part => {
    return <Part key={part.id} part={part} />
  })
  return (
    <div>
        {content}
    </div>
  )
}

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    );
  }

  export default Course;