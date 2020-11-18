import React from 'react'

const Course = ({ course }) => {
    const exercises = course.parts.map(part => part = part.exercises)
    const total = exercises.reduce((a,b) => a + b)

    return(
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(subCourse => {
                return <p key ={subCourse.id}>{subCourse.name} {subCourse.exercises}</p>
            })}

            <strong>total of {total} exercises</strong>
        </div>
    )
}

export default Course