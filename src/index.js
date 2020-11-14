// libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

// entities
import {store} from './redux/store'
import {ErrorBoundary} from './components/ErrorBoundary/ErrorBoundary'
import {ApiFactoryService} from './services/ApiFactoryService'
import {ApiFactoryProvider} from './services/ApiFactoryContext'
import {App} from './components/App/App'

const $root = document.getElementById('root')
const apiFactoryService = new ApiFactoryService()

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <ApiFactoryProvider value={apiFactoryService}>
                <Router>
                    <App />
                </Router>
            </ApiFactoryProvider>
        </ErrorBoundary>
    </Provider>,
    $root
)