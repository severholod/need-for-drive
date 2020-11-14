import React from 'react'
import {Link} from 'react-router-dom'
import {Header} from '../Header/Header'
import {Footer} from '../Footer/Footer'
import {mainPageContent} from '../content'

export const MainSection = () => {

    return (
        <div className="main-section">
            <Header/>
            <main className="main-section__middle">
                <h1 className="main-section__title">
                    {mainPageContent.overtitle} <span>{mainPageContent.title}</span>
                </h1>
                <h2 className="main-section__subtitle">
                    {mainPageContent.subtitle}
                </h2>
                <Link to="/order/">
                    <button
                        className={`btn btn_${mainPageContent.button.color} btn_${mainPageContent.button.size}`}>
                        {mainPageContent.button.text}
                    </button>
                </Link>
            </main>
            <Footer />
        </div>
    )
}