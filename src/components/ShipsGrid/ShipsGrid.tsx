import { FC, useState, useEffect, useReducer, useMemo } from 'react'
import { Vehicle, GraphQLResponse, ActionType, ShipFilter } from '../types';
import ShipCard from '../ShipCard/ShipCard';
import './ShipsGrid.css'
import Filter from '../Filter/Filter';
import Loading from '../UI/Loading';
import filtersReducer from '../../utils/reducer';

const ShipGrid: FC = () => {
    const [data, setData] = useState<Vehicle[]>([])
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
                // for (let i = shuffledData.length - 1; i > 0; i--) {
                //     let j = Math.floor(Math.random() * (i + 1));
                //     [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]]
                // }
                setData(shuffledData)
                setIsLoading(false)
            } catch (err) {
                console.error('Error: ', err);
            }
        }
        FetchAllShips()
    }, [])

    useMemo(() => {
        setUniqueLevels(Array.from(new Set(data.map(item => item.level))))
        setUniqueClasses(Array.from(new Set(data.map(item => item.type.title))))
        setUniqueNations(Array.from(new Set(data.map(item => item.nation.title))))
    }, [data])

    const filteredData = useMemo(() => {
        return data.filter(item => 
            (filters.levels.length === 0 || filters.levels.includes(item.level)) &&
            (filters.type.length === 0 || filters.type.includes(item.type.title)) &&
            (filters.nation.length === 0 || filters.nation.includes(item.nation.title))
        );
    }, [filters, data]);


    function HandleHightCallback(offset: number) {
        setOffset(offset)
    }

    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && (
                <>
                    <Filter shipClasses={uniqueClasses} shipLevels={uniqueLevels} shipNations={uniqueNations} dispatcher={dispatchFilters} callback={HandleHightCallback} />
                    {filteredData.length > 0 && (
                        <div className='ship-grid' style={{ marginTop: offset }}>
                            {filteredData.map((vehicle, index) => (
                                <ShipCard key={index} vehicle={vehicle} />
                            ))}
                        </div>
                    )}
                    {filteredData.length <= 0 && (
                        <div className='eror-container' style={{ marginTop: offset }}>
                            <p className='no-data-error'>Ship not found :(</p>
                        </div>
                    )}
                </>
            )}
        </>
    );

}

export default ShipGrid