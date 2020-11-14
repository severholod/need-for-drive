import React from 'react'
import {StepsItem} from './StepsItem'
import {useSelector} from 'react-redux'

export const StepsList = () => {
    const point = useSelector(state => state.currentPoint)
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
            disabled: true
        },
        {
            name: 'Итого',
            link: '/order/total/',
            disabled: true
        },
    ]
    return (
        <nav className="steps">
            <ul className="steps-list">
                {
                    steps.map((step, index) =>
                        <StepsItem
                            key={`step_${index}`}
                            {...step} />
                    )
                }
            </ul>
        </nav>
    )
}