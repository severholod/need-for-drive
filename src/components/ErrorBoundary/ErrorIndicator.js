import React from 'react'

export const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <span className="error-indicator-status">Упс!</span>
            <span>что-то пошло не так</span>
            <span>(но мы уже отправили программиста исправить это)</span>
            <span>Нажмите "F5" для перезагрузки страницы</span>
        </div>
    )
}