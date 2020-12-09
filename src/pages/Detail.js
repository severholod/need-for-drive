import React, {useEffect, useState} from 'react'
import {Navigation} from '../components/Navigation/Navigation'
import {Header} from '../components/Header/Header'
import {useHistory} from 'react-router-dom'
import {withApiFactoryService} from '../services/withApiFactoryService'
import {Loader} from '../components/Loader/Loader'
import {imgUrl} from '../services/ApiFactoryService'
import {dateOptions} from '../components/OrderSteps/Total'
import {getDifTime} from '../utils'

export let Detail = ({apiFactoryService}) => {
    const history = useHistory()
    const [isLoading, setLoadingStatus] = useState(true)
    const [order, setOrder] = useState({})
    const [fields, setFields] = useState([])
    useEffect(() => {
        setLoadingStatus(true)
        const orderId = history.location.hash.substring(1)
        apiFactoryService.getOrder(orderId)
            .then(newOrd => {
                setOrder(newOrd)
                setFields([
                    {name: 'Пункт выдачи', value: `${newOrd.cityId.name}, ${newOrd.pointId.address}`},
                    {name: 'Модель', value: newOrd.carId.name},
                    {name: 'Цвет', value: newOrd.color},
                    {name: 'Длительность аренды', value: getDifTime(newOrd.dateFrom, newOrd.dateTo)},
                    {name: 'Тариф', value: newOrd.rateId.rateTypeId.name},
                    {name: 'Полный бак', value: newOrd.isFullTank ? 'Да' : false},
                    {name: 'Детское кресло', value: newOrd.isNeedChildChair ? 'Да' : false},
                    {name: 'Правый руль', value: newOrd.isRightWheel ? 'Да' : false},
                ])
                setLoadingStatus(false)
            })
            .catch(err => {
                console.error(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="page">
            <Navigation />
            <div className="order">
                <Header />
                { isLoading &&
                    <Loader />
                }
                { !isLoading &&
                    <>
                        <nav className="steps">
                            <div className="order-title">
                                Заказ номер {order.id}
                            </div>
                        </nav>
                        <div className="order-content">
                            <div className="order-step">
                                <div id="total" className="total">
                                    <div className="total-items">
                                        <div className="order-status">Ваш заказ подтверждён</div>
                                        <div className="total-item total-carName">{order.carId.name}</div>
                                        { !!order.carId.number &&
                                            <div className="total-item total-carNumber"><span>{order.carId.number}</span></div>
                                        }
                                        { !!order.carId.tank &&
                                            <div className="total-item total-info"><span>Топливо &nbsp;</span>{order.carId.tank}%</div>
                                        }
                                        <div className="total-item total-info">
                                            <span>Доступна с &nbsp;</span>{new Date(order.dateFrom).toLocaleString('ru', dateOptions)}
                                        </div>
                                    </div>
                                    <div className="total-carImg">
                                        <img crossOrigin="anonymous" referrerPolicy={origin} src={`${imgUrl}${order.carId.thumbnail.path}`} alt={order.carId.name}/>
                                    </div>
                                </div>
                            </div>
                            <div className="order-info">
                                <div className="order-info__title">Ваш заказ:</div>
                                {fields.filter(field => field.value).map((field, index) => (
                                    <div className="order-info__item" key={`field_${index}`}>
                                        <span className="order-info__item-name">{field.name}</span>
                                        <span className="order-info__item-value">{field.value}</span>
                                    </div>
                                ))}
                                <div className="order-info__price">
                                    <span>Цена: </span> {order.price}
                                </div>
                                <button className="btn btn_darkred btn_xl">Отменить</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
Detail = withApiFactoryService(Detail)