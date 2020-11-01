import React from 'react'
import {Link} from 'react-router-dom'
import {Location} from '../Location/Location'

export const MainSection = () => {
    const content = {
        logo: 'Need for drive',
        overtitle: 'Каршеринг',
        title: 'Need for drive',
        subtitle: 'Поминутная аренда авто твоего города',
        button: {
            text: 'Забронировать',
            size: 'large',
            color: 'green'
        },
        copyright: '© 2016-2019 «Need for drive»',
        phone: '8 (495) 234-22-44'
    }
    return (
        <div className="main-section">
            <header className="main-section__top header">
                <div className="logo">
                    {content.logo}
                </div>
                <Location />
            </header>
            <main className="main-section__middle">
                <h1 className="main-section__title">
                    {content.overtitle} <span>{content.title}</span>
                </h1>
                <h2 className="main-section__subtitle">
                    {content.subtitle}
                </h2>
                <Link to="/order">
                    <button
                        className={`btn btn_${content.button.color} btn_${content.button.size}`}>
                        {content.button.text}
                    </button>
                </Link>
            </main>
            <footer className="main-section__bottom footer">
                <div className="copyright">
                    {content.copyright}
                </div>
                <div className="phone">
                    <a className="link link_black" href={`tel:${content.phone}`}>{content.phone}</a>
                </div>
            </footer>
        </div>
    )
}