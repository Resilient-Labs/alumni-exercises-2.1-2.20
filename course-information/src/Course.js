import React from 'react'
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = (props) => {
    //mapping through course map and creating course container for every part by using the ID as key
    const courseMap = () => props.course.map(part => (
        <div key={part.id}>{<CourseContainer course={part} />}</div>
    ));
    //returning a fragment of the part
    return <>{courseMap()}</>;

};

const CourseContainer = props => {
    return (
        <div>
            <Header
                course={props}
            />
            <Content
                course={props.course.parts}
            />
            <Total
                total={props.course.parts}
            />
        </div>)
}

export default Course;