import { FC, useState } from 'react'
import { Vehicle } from '../ShipsGrid/types';

interface props {
    vehicle : Vehicle
}

const ShipCard: FC<props> = (props) => {
    //Пользователь должен иметь возможность посмотреть на странице основные параметры корабля: 
    //название, класс, нация, уровень, описание, изображение и отфильтровать корабли по уровню, нации и классу. 
    const vehicle = props.vehicle;

    return (
        <div className='ship-card'>
            <h3 className='vehicle-name'>{vehicle.title}</h3>
            <p>{vehicle.type.title}</p>
            <p>{vehicle.nation.title}</p>
            <p>{vehicle.level}</p>
            <p>{vehicle.description}</p>
            <img src={vehicle.icons.large}></img>

        </div>
    )
}

export default ShipCard