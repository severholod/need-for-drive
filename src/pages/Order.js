import React from 'react'
import {Navigation} from '../components/Navigation/Navigation'
import {Header} from '../components/Header/Header'
import {StepsList} from '../components/OrderStepsNav/StepsList'
import {OrderSteps} from '../components/OrderSteps/OrderSteps'

export const Order = () => {
    return (
        <div className="page">
            <Navigation />
            <div className="order">
                <Header />
                <StepsList />
                <OrderSteps />
            </div>
        </div>
    )
}