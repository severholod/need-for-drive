import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {isEmpty} from '../../utils'
import {getCar, getCity, getPoint, getStep} from '../../redux/selectors'
import {changeStep} from '../../redux/actions'


export const OrderInfo = () => {
    const city = useSelector(getCity)
    const point = useSelector(getPoint)
    const car = useSelector(getCar)
    const step = useSelector(getStep)
    const dispatch = useDispatch()
    console.log(step)
    const buttonDetail = [
        {
            text: 'Выбрать модель',
            link: '/cars/',
            disabled: !Boolean(point)
        },
        {
            text: 'Допольнительно',
            link: '/additionally/',
            disabled: isEmpty(car)
        },
        {
            text: 'Итого',
            link: '/total/',
            disabled: true,
        },
        {
            text: 'Заказать',
            link: './',
            disabled: false
        }
    ]

    return (
        <div className="order-info">
            <div className="order-info__title">Ваш заказ:</div>
            { point &&
                <div className="order-info__item">
                    <span className="order-info__item-name">Пункт выдачи</span>
                    <span className="order-info__item-value">{city}<br/> {point}</span>
                </div>
            }
            { !isEmpty(car) &&
                <div className="order-info__item">
                    <span className="order-info__item-name">Модель</span>
                    <span className="order-info__item-value">{car.name}</span>
                </div>
            }
            {   !isEmpty(car) &&
                <div className="order-info__price">
                    <span>Цена:</span> от {car.priceMin} до {car.priceMax} ₽
                </div>
            }
            <Link to={`/order${buttonDetail[step].link}`}
                  className={classNames('btn btn_xl btn_green', {'btn_disabled': buttonDetail[step].disabled})}
                  onClick={() => dispatch(changeStep(step + 1))}>
                    {buttonDetail[step].text}
            </Link>
        </div>
    )
}