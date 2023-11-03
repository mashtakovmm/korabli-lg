import { FC, useState, useEffect } from 'react'
import { Vehicle, GraphQLResponse } from '../types';
import ShipCard from '../ShipCard/ShipCard';
import './ShipsGrid.css'
import Filter from '../Filter/Filter';

const ShipGrid: FC = (props) => {
    const [data, setData] = useState<Vehicle[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [uniqueClasses, setUniqueClasses] = useState<string[]>([])
    const [uniqueNations, setUniqueNations] = useState<string[]>([])
    const [uniqueLevels, setUniqueLevels] = useState<number[]>([])

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

                // shuffle array for more fun
                // uncomment to use
                let shuffledData = [...resp.data.vehicles];
                for (let i = shuffledData.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]]
                }
                setData(shuffledData)
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

    return (
        <>
            {isLoading && <div>Loading....</div>}
            {!isLoading && (
                <>
                    <Filter shipClasses={uniqueClasses} shipLevels={uniqueLevels} shipNations={uniqueNations} />
                    <div className='ship-grid'>
                        {data.map((vehicle, index) => (
                            <ShipCard key={index} vehicle={vehicle} />
                        ))}
                    </div>
                </>
            )}
        </>
    );

}

export default ShipGrid