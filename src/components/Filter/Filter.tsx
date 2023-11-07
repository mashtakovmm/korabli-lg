import { FC } from 'react'
import "./Filter.css"
import FilterButton from '../UI/FilterButton'
import { ActionType } from '../types';

interface props {
    shipNations: string[]
    shipLevels: number[]
    shipClasses: string[]
    dispatcher: React.Dispatch<ActionType>
}

const Filter: FC<props> = (props) => {
    const { shipClasses, shipLevels, shipNations, dispatcher } = props
    return (
        <div className='header'>
            <div className='filter-container'>
                <h4 className='filter-title'>Nation</h4>
                <div className='button-container'>
                    {shipNations.sort().map((nation, index) => (
                        <FilterButton key={index} text={nation} value={nation} dispatcher={dispatcher} filterName="nation"></FilterButton>
                    ))}
                </div>
            </div>
            <div className='filter-container'>
                <h4 className='filter-title'>Class</h4>
                <div className='button-container'>
                    {shipClasses.sort().map((shipClass, index) => (
                        <FilterButton key={index} text={shipClass} value={shipClass} dispatcher={dispatcher} filterName="class"></FilterButton>
                    ))}
                </div>
            </div>
            <div className='filter-container'>
                <h4 className='filter-title'>Level</h4>
                <div className='button-container'>
                    {[...shipLevels].sort((a, b) => a - b).map((level, index) => (
                        <FilterButton key={index} text={level} value={level} dispatcher={dispatcher} filterName="level"></FilterButton>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Filter