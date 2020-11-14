import React from 'react'
import icon from '../../assets/img/locIcon.svg'

export const City = () => {
    return (
        <div className="city">
            <div className="city__icon">
                <img src={icon} alt="icon"/>
            </div>
            <div className="city__name">
                Ульяновск
            </div>
        </div>
)
}
