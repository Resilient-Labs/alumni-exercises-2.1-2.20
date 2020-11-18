import React from 'react'

const Person = ({ name, number }) => {
    return(
        <li>{name} · {number}</li>
    )
}

export default Person