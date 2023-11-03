import { FC } from 'react'
import "./Filter.css"
import FilterButton from '../UI/FilterButton'

interface props {
    shipNations: string[]
    shipLevels: number[]
    shipClasses: string[]
}

const Filter: FC<props> = (props) => {
    const { shipClasses, shipLevels, shipNations } = props
    return (
        <div className='header'>
            <div className='filter-container'>
                <h4 className='filter-title'>Nation</h4>
                <div className='button-container'>
                    {shipNations.sort().map((nation, index) => (
                        <FilterButton key={index} text={nation} value={nation}></FilterButton>
                    ))}
                </div>
            </div>
            <div className='filter-container'>
                <h4 className='filter-title'>Class</h4>
                <div className='button-container'>
                    {shipClasses.sort().map((shipClass, index) => (
                        <FilterButton key={index} text={shipClass} value={shipClass}></FilterButton>
                    ))}
                </div>
            </div>
            <div className='filter-container'>
                <h4 className='filter-title'>Level</h4>
                <div className='button-container'>
                    {[...shipLevels].sort((a, b) => a - b).map((level, index) => (
                        <FilterButton key={index} text={level} value={level}></FilterButton>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Filter