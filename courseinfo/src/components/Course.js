// Exercise 2.5 Course Information - Seperate Module

import React from "react";

const Course = ({course}) => (
  <>
    <Header course={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}></Total>
  </>
);

const Header = ({course}) => <h1>{course}</h1>;

const Part = (course) => {
  return (
    <p>
      {course.name} {course.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  const listOfParts = parts.map(line => <Part key={line.id} name={line.name} exercises={line.exercises}></Part>)
  return (
    <div>
      {listOfParts}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((acc, cv) => acc + cv.exercises, 0)
  //why isn't it acc.exercises? Because acc stores the cv.exercises numbers associated to it after each callback invocation
  return (
    <p>
      Total of {total} exercises
    </p>
  )
}

export default Course;
