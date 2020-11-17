export const menuStatusChange = () => {
    return {
        type: 'MENU_STATUS_CHANGE'
    }
}
export const citiesLoaded = (cities) => {
    return {
        type: 'CITIES_ARE_LOADED',
        payload: cities
    }
}
export const pointsLoaded = (points) => {
    return {
        type: 'POINTS_ARE_LOADED',
        payload: points
    }
}
export const setCurrentCity = (city) => {
    return {
        type: 'SET_CURRENT_CITY',
        payload: city
    }
}
export const setCurrentPoint = (point) => {
    return {
        type: 'SET_CURRENT_POINT',
        payload: point
    }
}