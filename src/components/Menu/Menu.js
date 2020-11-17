import React from 'react'
import {Link} from 'react-router-dom'
import {Telegram} from '../SocIcons/Telegram'
import {Facebook} from '../SocIcons/Facebook'
import {Instagram} from '../SocIcons/Instagram'
import {menu} from '../content'

export const Menu = ({onMenuStatusChange}) => {

    return (
        <nav className="menu">
                <ul className="menu__list">
                    {
                        menu.map((item, index) => {
                            return (
                                <li className="menu__item" key={`menu__item_${index}`}>
                                    <Link to="/order/" onClick={onMenuStatusChange}>
                                        {item}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="menu-soc">
                    <Telegram />
                    <Facebook />
                    <Instagram />
                </div>
            </nav>
    )
}