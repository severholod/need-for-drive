import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Main} from '../../pages/Main';
import {Order} from '../../pages/Order';
import './App.sass'

export const App = () => {
    return (
        <Switch>
            <Route path="/" component={Main} exact/>
            <Route path="/order" component={Order}/>
        </Switch>
    )
}