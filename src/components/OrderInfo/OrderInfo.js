import React, {useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {isEmpty} from '../../utils'
import {getCar, getCity, getDifferenceTime, getPoint, getPrice, getStep, getTariff} from '../../redux/selectors'
import {changeStep} from '../../redux/actions'

export const OrderInfo = (props) => {
    const city = useSelector(getCity)
    const point = useSelector(getPoint)
    const car = useSelector(getCar)
    const step = useSelector(getStep)
    const orderPrice = useSelector(getPrice)
    const differenceTime = useSelector(getDifferenceTime)
    const tariff = useSelector(getTariff)
    const dispatch = useDispatch()
    const validPrice = !(car.priceMin <= orderPrice && orderPrice <= car.priceMax)
    const fields = useMemo(() => {
        return [
            {name: 'Пункт выдачи', value: !isEmpty(point) ? `${city.name}, ${point.address}` : ''},
            {name: 'Модель', value: car.name},
            {name: 'Цвет', value: props.carColor},
            {name: 'Длительность аренды', value: differenceTime},
            {name: 'Тариф', value: !isEmpty(tariff) ? tariff.rateTypeId.name : ''},
            {name: 'Полный бак', value: props.fullTank ? 'Да' : false},
            {name: 'Детское кресло', value: props.babyChair ? 'Да' : false},
            {name: 'Правый руль', value: props.rightHand ? 'Да' : false},
        ]
    }, [point, car, props, city, differenceTime, tariff])
    const buttonDetail = useMemo(() => {
        return [
            {
                text: 'Выбрать модель',
                link: '/cars/',
                disabled: isEmpty(point)
            },
            {
                text: 'Дополнительно',
                link: '/additionally/',
                disabled: isEmpty(car)
            },
            {
                text: 'Итого',
                link: '/total/',
                disabled: validPrice,
            },
            {
                text: 'Заказать',
                link: '/total/',
                disabled: false
            }
        ]
    }, [point, car, validPrice])
    const [isActive, changeActiveStatus] = useState(false)
    const handlerLinkClick = () => {
        if (step === 3) {
            changeActiveStatus(true)
        } else {
            dispatch(changeStep(step + 1))
        }
    }
    const handlerCancel = () => {
        changeActiveStatus(false)
    }
    return (
        <>
            { isActive &&
                <div className="order-overlay">
                    <div className="order-overlay__content">
                        <div className="order-overlay__title">Подтвердить заказ</div>
                        <div className="order-overlay__buttons">
                            <button className="btn btn_green btn_medium" type="submit">Подтвердить</button>
                            <button className="btn btn_medium btn_darkred"
                                    onClick={handlerCancel}>
                                Вернуться
                            </button>
                        </div>
                        {props.request &&
                            <div className="order-overlay__status">Выполняется...</div>
                        }
                    </div>
                </div>
            }
            <div className="order-info">
                <div className="order-info__title">Ваш заказ:</div>
                {fields.filter(field => field.value).map((field, index) => (
                    <div className="order-info__item" key={`field_${index}`}>
                        <span className="order-info__item-name">{field.name}</span>
                        <span className="order-info__item-value">{field.value}</span>
                    </div>
                ))}
                {   !isEmpty(car) &&
                    <div className="order-info__price">
                        <span>Цена: </span>{orderPrice ? `${orderPrice} ₽` : `от ${car.priceMin} до ${car.priceMax} ₽`}
                    </div>
                }
                <Link to={`/order${buttonDetail[step].link}`}
                      className={classNames('btn btn_xl btn_green', {'btn_disabled': buttonDetail[step].disabled})}
                      onClick={handlerLinkClick}>
                        {buttonDetail[step].text}
                </Link>
                { !!orderPrice && validPrice &&
                    <div className="order-info__alert">Сумма заказа на данное авто должна составлять от {car.priceMin} до {car.priceMax} ₽</div>
                }
            </div>
        </>
    )
}