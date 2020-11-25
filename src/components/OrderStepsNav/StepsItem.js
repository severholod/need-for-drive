import React from 'react'
import {NavLink} from 'react-router-dom'

export const StepsItem = ({name, link, disabled, onClick}) => {
    return (
        <li className="steps-list__item">
            <NavLink
                to={link}
                onClick={onClick}
                exact
                className={`${disabled ? 'disabled' : 'enabled'}`}>
                {name}
            </NavLink>
        </li>
    )
}