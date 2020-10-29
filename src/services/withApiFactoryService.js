import React from 'react'
import {ApiFactoryConsumer} from './ApiFactoryContext'

export const withApiFactoryService = (Component) => (props) => {
    return (
        <ApiFactoryConsumer>
            {
                (apiFactoryService) => {
                    return (
                        <Component {...props} apiFactoryService={apiFactoryService}/>
                    )
                }
            }
        </ApiFactoryConsumer>
    )
}