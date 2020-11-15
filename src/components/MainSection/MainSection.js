import React from 'react'
import {Link} from 'react-router-dom'
import {Header} from '../Header/Header'
import {Footer} from '../Footer/Footer'

export const MainSection = () => {

    return (
        <div className="main-section">
            <Header/>
            <main className="main-section__middle">
                <h1 className="main-section__title">
                    Каршеринг <span>Need for drive</span>
                </h1>
                <h2 className="main-section__subtitle">
                    Поминутная аренда авто твоего города
                </h2>
                <Link to="/order/">
                    <button className="btn btn_green btn_large">
                        Забронировать
                    </button>
                </Link>
            </main>
            <Footer />
        </div>
    )
}