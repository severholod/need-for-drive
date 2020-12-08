import React from 'react'
import {City} from '../City/City'
import {Link} from 'react-router-dom'

export const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <div className="logo">
                    Need for drive
                </div>
            </Link>
            <City />
        </header>
    )
}