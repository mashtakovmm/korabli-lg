import { FC, useState } from 'react'
import "./FilterButton.css"
import { ActionType } from '../types'

interface props {
    text: string | number
    value: string | number
    filterName: string
    dispatcher: React.Dispatch<ActionType>
}

const FilterButton: FC<props> = (props) => {
    const { text, value, dispatcher, filterName } = props
    const [isActive, setIsActive] = useState(false)

    function onClick() {
        if (!isActive) {
            dispatcher({
                type: `ADD_${filterName.toUpperCase()}`,
                payload: value
            })
        } else {
            dispatcher({
                type: `DELETE_${filterName.toUpperCase()}`,
                payload: value
            })
        }
        setIsActive(prev => !prev)
    }

    return (
        <button className={`filter-button ${isActive ? "active" : ""}`} onClick={onClick}>{text}</button>
    )
}

export default FilterButton