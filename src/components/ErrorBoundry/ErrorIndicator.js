import React from 'react';

export const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <span className="error-indicator-status">Error!</span>
            <span>something has gone terribly wrong</span>
            <span>(but we have already sent programmers to fix it)</span>
            <span>Press "F5" to reload this page</span>
        </div>
    )
}