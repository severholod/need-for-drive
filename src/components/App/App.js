import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Main} from '../../pages/Main'
import {Order} from '../../pages/Order'
import '../../assets/styles/main.sass'
import {ErrorIndicator} from '../ErrorBoundary/ErrorIndicator'

export const App = () => {
    return (
        <Switch>
            <Route path="/need-for-drive/" component={Main} exact/>
            <Route path="/order/" component={Order}/>
            <Route component={ErrorIndicator}/>
        </Switch>
    )
}