import { FC, useEffect, useMemo, useRef } from 'react'
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
    let heightOffset: number

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                if (ref.current) {
                    heightOffset = entry.contentRect.height + parseInt(window.getComputedStyle(ref.current).getPropertyValue('padding')) + 15
                }
                callback(heightOffset)
            });
        });

        const headerElement = document.querySelector(".header");
        if (headerElement) {
            resizeObserver.observe(headerElement);
        }

        return () => {
            if (headerElement) {
                resizeObserver.unobserve(headerElement);
            }
        };
    }, [])

    const sortedNations = useMemo(()=> {
        return shipNations.sort()
    }, [shipNations])

    const sortedLevels = useMemo(()=> {
        return [...shipLevels].sort((a, b) => a - b)
    }, [shipLevels])

    const sortedClasses = useMemo(()=> {
        return shipClasses.sort()
    }, [shipClasses])

    return (
        <div className='header' ref={ref}>
            <div className='filter-container'>
                <h4 className='filter-title'>Nation</h4>
                <div className='button-container'>
                    {sortedNations.map((nation, index) => (
                        <FilterButton key={index} text={nation} value={nation} dispatcher={dispatcher} filterName="nation"></FilterButton>
                    ))}
                </div>
            </div>
            <div className='filter-container'>
                <h4 className='filter-title'>Class</h4>
                <div className='button-container'>
                    {sortedClasses.map((shipClass, index) => (
                        <FilterButton key={index} text={shipClass} value={shipClass} dispatcher={dispatcher} filterName="class"></FilterButton>
                    ))}
                </div>
            </div>
            <div className='filter-container'>
                <h4 className='filter-title'>Level</h4>
                <div className='button-container'>
                    {sortedLevels.map((level, index) => (
                        <FilterButton key={index} text={level} value={level} dispatcher={dispatcher} filterName="level"></FilterButton>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Filter