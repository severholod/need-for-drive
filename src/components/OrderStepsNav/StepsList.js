import React from 'react'
import {StepsItem} from './StepsItem'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from '../../utils'
import {getCar, getPoint, getPrice} from '../../redux/selectors'
import {changeStep} from '../../redux/actions'

export const StepsList = () => {
    const point = useSelector(getPoint)
    const car = useSelector(getCar)
    const orderPrice = useSelector(getPrice)
    const dispatch = useDispatch()
    const steps = [
        {
            name: 'Местоположение',
            link: '/order/',
            disabled: false
        },
        {
            name: 'Модель',
            link: '/order/cars/',
            disabled: !Boolean(point)
        },
        {
            name: 'Дополнительно',
            link: '/order/additionally/',
            disabled: isEmpty(car)
        },
        {
            name: 'Итого',
            link: '/order/total/',
            disabled: !(car.priceMin <= orderPrice && orderPrice <= car.priceMax)
        },
    ]
    return (
        <nav className="steps">
            <ul className="steps-list">
                {
                    steps.map((step, index) =>
                        <StepsItem
                            onClick={() => dispatch(changeStep(index))}
                            key={`step_${index}`}
                            {...step} />
                    )
                }
            </ul>
        </nav>
    )
}