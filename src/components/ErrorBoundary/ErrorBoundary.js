import React from 'react';
import {ErrorIndicator} from './ErrorIndicator';

export class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }
    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="error-wrap">
                    <ErrorIndicator />
                </div>
            )
        }

        return this.props.children
    }
}