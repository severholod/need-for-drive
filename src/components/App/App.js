import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Main} from '../../pages/Main'
import {Order} from '../../pages/Order'
import {Detail} from '../../pages/Detail'
import '../../assets/styles/main.sass'
import {ErrorIndicator} from '../ErrorBoundary/ErrorIndicator'

export const App = () => {
    return (
        <Switch>
            <Route path="/" component={Main} exact/>
            <Route path="/order/" component={Order}/>
            <Route path="/detail/" component={Detail}/>
            <Route component={ErrorIndicator}/>
        </Switch>
    )
}