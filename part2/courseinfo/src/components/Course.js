import React from 'react'

const Header = ({course}) => {
  return(
    <>
      <h2>{course}</h2>
    </>
  )
}

const Content = ({parts}) => {
  return(
    <>
      {parts.map( part =>
          <Part key = {part.id} part = {part} />
      )}
    </>
  )
}

const Part = ({part}) => {
  return(
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}

const Total = ({parts}) => {
  return(
    <>
      <b>total of {parts.reduce((sum, parts) => sum + parts.exercises,0)} exercises</b>
    </>
  )
}

const Course = ({course}) => {
  return(
    <> 
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  );
}

export default Course

