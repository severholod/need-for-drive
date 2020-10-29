import React from 'react';
import {ErrorIndicator} from './ErrorIndicator';

export class ErrorBoundry extends React.Component {
    constructor() {
        super()
        this.state = {
            hasError: false
        }
    }
    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }
    render() {
        if (this.state.hasError) {
            return (
                <ErrorIndicator />
            )
        }

        return this.props.children
    }
}