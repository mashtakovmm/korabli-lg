import { FC, useEffect, useRef } from 'react'
import "./Filter.css"
import FilterButton from '../UI/FilterButton'
import { ActionType } from '../types';

interface props {
    shipNations: string[]
    shipLevels: number[]
    shipClasses: string[]
    dispatcher: React.Dispatch<ActionType>
    callback: Function
}

const Filter: FC<props> = (props) => {
    const { shipClasses, shipLevels, shipNations, dispatcher, callback } = props
    const ref = useRef(null)
    let heightOffset:number

    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            if(ref.current) {
                heightOffset = entry.contentRect.height + parseInt(window.getComputedStyle(ref.current).getPropertyValue('padding')) + 15
            }
            callback(heightOffset)
        });
    });

    useEffect(() => {
        const headerElement = document.querySelector(".header");
        if (headerElement) {
            resizeObserver.observe(headerElement);
        }
    }, [])

    return (
        <div className='header' ref={ref}>
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