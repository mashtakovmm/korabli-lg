import { FC, useState, useEffect } from 'react'
import { Vehicle, GraphQLResponse } from './types';
import ShipCard from '../ShipCard/ShipCard';


const ShipGrid: FC = (props) => {
    const [data, setData] = useState<Vehicle[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function FetchAllShips() {
            try {
                const response = await fetch('https://vortex.korabli.su/api/graphql/glossary/', {
                    method: 'POST',
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
                console.log(resp.data.vehicles);

                setData(resp.data.vehicles)
                setIsLoading(false)
            } catch (err) {
                console.error('Error:', err);
            }
        }
        FetchAllShips()
    }, [])

    return (
        <>
            {isLoading && <div>Loading....</div>}
            {!isLoading && (
                <div className='ship-grid'>
                    {data.map((vehicle, index) => (
                        <ShipCard key={index} vehicle={vehicle} />
                    ))}
                </div>
            )}
        </>
    );

}

export default ShipGrid