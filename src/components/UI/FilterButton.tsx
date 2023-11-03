import { FC } from 'react'
import "./FilterButton.css"

interface props {
    key: number
    text: string | number
    value: string | number
}

const FilterButton: FC<props> = (props) => {
    const { key, text, value } = props
    return (
        <button key={key} className='filter-button'>{text}</button>
    )
}

export default FilterButton