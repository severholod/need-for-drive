import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import classNames from 'classnames'

export const OrderInfo = ({isValid}) => {
    const city = useSelector(state => state.currentCity)
    const point = useSelector(state => state.currentPoint)

    return (
        <div className="order-info">
            <div className="order-info__title">Ваш заказ:</div>
            { point &&
                <div className="order-info__item">
                    <span className="order-info__item-name">Пункт выдачи</span>
                    <span className="order-info__item-value">{city}<br/> {point}</span>
                </div>
            }
            {   point &&
                <div className="order-info__price">
                    <span>Цена:</span> от 8 000 до 12 000 ₽
                </div>
            }
            <Link to="/order/cars/" className={classNames('btn btn_xl btn_green', {'btn_disabled': !Boolean(point)})} >Выбрать модель</Link>
        </div>
    )
}