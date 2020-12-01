// Exercise 2.5 Course Information - Seperate Module

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

//---------------------------------------------------------------------------------------------------------

// Exercise 2.4 Course Information - Step 9

import React from "react";
import ReactDOM from "react-dom";

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}></Course>)}
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));


//---------------------------------------------------------------------------------------------------------

// Exercise 2.3 Course Information - Step 8

import React from "react";
import ReactDOM from "react-dom";

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

const App = () => {
  const course = {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
  }

  return <Course key={course.id} course={course}></Course>
};

ReactDOM.render(<App />, document.getElementById("root"));

//---------------------------------------------------------------------------------------------------------

// Exercise 2.2 Course Information - Step 7

import React from "react";
import ReactDOM from "react-dom";

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
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises;
  return (
    <p>
      Total of {total} exercises
    </p>
  )
}

const App = () => {
  const course = {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
  }

  return <Course key={course.id} course={course}></Course>
};

ReactDOM.render(<App />, document.getElementById("root"));

//---------------------------------------------------------------------------------------------------------

// Exercise 2.1 Course Information - Step 6

import React from "react";
import ReactDOM from "react-dom";

const Course = ({course}) => (
  <>
    <Header course={course.name}></Header>
    <Content parts={course.parts}></Content>
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

const App = () => {
  const course = {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        }
      ]
  }

  return <Course key={course.id} course={course}></Course>
};

ReactDOM.render(<App />, document.getElementById("root"));
