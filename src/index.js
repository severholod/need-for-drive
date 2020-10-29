// libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

// entities
import {store} from './store'
import {ErrorBoundry} from './components/ErrorBoundry'
import {ApiFactoryService} from './services/ApiFactoryService'
import {ApiFactoryProvider} from './services/ApiFactoryContext'
import {App} from './components/App/App'

const $root = document.getElementById('root')
const apiFactoryService = new ApiFactoryService()

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <ApiFactoryProvider value={apiFactoryService}>
                <Router>
                    <App />
                </Router>
            </ApiFactoryProvider>
        </ErrorBoundry>
    </Provider>,
    $root
)