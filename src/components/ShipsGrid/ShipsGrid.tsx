import { FC, useState, useEffect, useReducer, useRef } from 'react'
import { Vehicle, GraphQLResponse, ShipFilter, ActionType } from '../types';
import ShipCard from '../ShipCard/ShipCard';
import './ShipsGrid.css'
import Filter from '../Filter/Filter';

const ShipGrid: FC = () => {
    const [data, setData] = useState<Vehicle[]>([])
    const [displayData, setDisplayData] = useState<Vehicle[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [uniqueClasses, setUniqueClasses] = useState<string[]>([])
    const [uniqueNations, setUniqueNations] = useState<string[]>([])
    const [uniqueLevels, setUniqueLevels] = useState<number[]>([])
    const [offset, setOffset] = useState(0)

    const initialState: ShipFilter = {
        levels: [],
        nation: [],
        type: []
    };

    const [filters, dispatchFilters] = useReducer<React.Reducer<ShipFilter, ActionType>>(filtersReducer, initialState);

    useEffect(() => {
        async function FetchAllShips() {
            try {
                const response = await fetch('https://vortex.korabli.su/api/graphql/glossary/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                      {
                        vehicles {
                          title
                          description
                          icons {
                            large
                            medium
                          }
                          level
                          type {
                            name
                            title
                            icons {
                              default
                            }
                          }
                          nation {
                            name
                            title
                            color
                            icons {
                              small
                              medium
                              large
                            }
                          }
                        }
                      }
                    `
                    })
                });
                const resp: GraphQLResponse = await response.json();

                // shuffle array
                // uncomment to use
                let shuffledData = [...resp.data.vehicles];
                for (let i = shuffledData.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]]
                }
                setData(shuffledData)
                setDisplayData(shuffledData)
                setIsLoading(false)
            } catch (err) {
                console.error('Error:', err);
            }
        }
        FetchAllShips()
    }, [])

    useEffect(() => {
        setUniqueLevels(Array.from(new Set(data.map(item => item.level))))
        setUniqueClasses(Array.from(new Set(data.map(item => item.type.title))))
        setUniqueNations(Array.from(new Set(data.map(item => item.nation.title))))
    }, [data])

    useEffect(() => {
        let itemsToShow = data
        if (filters.levels.length > 0) {
            itemsToShow = itemsToShow.filter(item => filters.levels.includes(item.level));
        }
        if (filters.nation.length > 0) {
            itemsToShow = itemsToShow.filter(item => filters.nation.includes(item.nation.title));
        }
        if (filters.type.length > 0) {
            itemsToShow = itemsToShow.filter(item => filters.type.includes(item.type.title));
        }
        setDisplayData(itemsToShow)
    }, [filters])


    function filtersReducer(state: ShipFilter, action: ActionType): ShipFilter {
        switch (action.type) {
            case 'ADD_LEVEL': {
                return {
                    ...state,
                    levels: [...state.levels, action.payload as number]
                }
            }
            case 'ADD_NATION': {
                return {
                    ...state,
                    nation: [...state.nation, action.payload as string]
                }
            }
            case 'ADD_CLASS': {
                return {
                    ...state,
                    type: [...state.type, action.payload as string]
                }
            }
            case 'DELETE_LEVEL': {
                return {
                    ...state,
                    levels: [...state.levels.filter(item => item != action.payload)]
                }
            }
            case 'DELETE_NATION': {
                return {
                    ...state,
                    nation: [...state.nation.filter(item => item != action.payload)]
                }
            }
            case 'DELETE_CLASS': {
                return {
                    ...state,
                    type: [...state.type.filter(item => item != action.payload)]
                }
            }
            default: {
                return { ...state }
            }
        }
    }

    function HandleHightCallback(offset:number) {
        setOffset(offset)
        console.log(offset);
        
    }

    return (
        <>
            {isLoading && <div>Loading....</div>}
            {!isLoading && (
                <>
                    <Filter shipClasses={uniqueClasses} shipLevels={uniqueLevels} shipNations={uniqueNations} dispatcher={dispatchFilters} callback={HandleHightCallback}/>
                    {displayData.length > 0 && (
                        <div className='ship-grid' style={{marginTop:offset}}>
                            {displayData.map((vehicle, index) => (
                                <ShipCard key={index} vehicle={vehicle} />
                            ))}
                        </div>
                    )}
                    {displayData.length <= 0 && (
                        <div style={{marginTop:offset}}>
                            {`No data :(`}
                        </div>
                    )}
                </>
            )}
        </>
    );

}

export default ShipGrid