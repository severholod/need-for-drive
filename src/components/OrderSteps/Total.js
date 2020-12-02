import React from 'react'
import {useSelector} from 'react-redux'
import {getCar, getStartDate} from '../../redux/selectors'
import {imgUrl} from '../../services/ApiFactoryService'

export const Total = () => {
    const car = useSelector(getCar)
    const startDate = useSelector(getStartDate)
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    return (
        <div id="total" className="total">
            <div className="total-items">
                <div className="total-item total-carName">{car.name}</div>
                <div className="total-item total-carNumber"><span>{car.number}</span></div>
                <div className="total-item total-info"><span>Топливо &nbsp;</span>{car.tank}%</div>
                <div className="total-item total-info">
                    <span>Доступна с &nbsp;</span>{startDate.toLocaleString('ru', dateOptions)}
                </div>
            </div>
            <div className="total-carImg">
                <img crossOrigin="anonymous" referrerPolicy={origin} src={`${imgUrl}${car.thumbnail.path}`} alt={car.name}/>
            </div>
        </div>
    )
}