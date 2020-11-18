import React from 'react'

const FilterName = ({ value, onChange }) => {
    return(
        <div>
            filter names with: <input value={value} onChange={onChange} />
        </div>
    )
}

export default FilterName