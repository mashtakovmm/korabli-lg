import { FC } from 'react'
import { Vehicle } from '../types';
import './ShipCard.css'

interface props {
    vehicle: Vehicle
}

const ShipCard: FC<props> = (props) => {
    //Пользователь должен иметь возможность посмотреть на странице основные параметры корабля: 
    //название, класс, нация, уровень, описание, изображение и отфильтровать корабли по уровню, нации и классу. 
    const vehicle = props.vehicle;

    return (
        <div className='ship-card'>
            <div className='main-info-container'>
                <h3 className='vehicle-name'>{vehicle.title}</h3>
                <hr></hr>
                <h4 className='info-section-title'>Class</h4>
                <div className='info-text'>
                    <p>{vehicle.type.title}</p>
                    <img src={vehicle.type.icons.default} alt={vehicle.type.title} title={vehicle.type.title} />
                </div>
                <hr></hr>
                <h4 className='info-section-title'>Level: {vehicle.level}</h4>
                <hr></hr>
                <h4 className='info-section-title'>Nation</h4>
                <div className='info-text nation-info'>
                    <img src={vehicle.nation.icons.small} alt={vehicle.nation.title} title={vehicle.nation.title}/>
                    <p>{vehicle.nation.title}</p>
                </div>
            </div>
            <div className='secondary-info-container'>
                <p className='vehicle-description'>{vehicle.description}</p>
                <img className='ship-img' src={vehicle.icons.large} alt={vehicle.title} title={vehicle.title} />
            </div>
        </div>
    )
}

export default ShipCard