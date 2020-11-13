  
import React from 'react';

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    );
};

export default Course;

// display course name
const Header = ({name}) => <h2>{name}</h2>;

// display info about all the parts of a course
const Content = ({parts}) => {

    // Total number of exercises in the course
    const total = parts.reduce((sum, currentPart) => sum + currentPart.exercises, 0);

    return (
        <div>
            {parts.map(part => <Part part={part} key={part.id} />)}
            <p><strong>total of {total} exercises</strong></p>
        </div>
    );
};

// display the name of a part and the number of exercises in it
const Part = ({part}) => <p>{part.name} {part.exercises}</p>;