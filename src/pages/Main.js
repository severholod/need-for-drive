import React from 'react'
import {Navigation} from '../components/Navigation/Navigation'
import {MainSection} from '../components/MainSection/MainSection'
import {Slider} from '../components/Slider/Slider'

export const Main = () => {
    return (
        <div className="page">
            <Navigation />
            <MainSection />
            <Slider />
        </div>
    )
}