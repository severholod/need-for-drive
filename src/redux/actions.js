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
export const carsLoaded = (cars) => {
    return {
        type: 'CARS_ARE_LOADED',
        payload: cars
    }
}
export const setCurrentCar = (car) => {
    return {
        type: 'SET_CURRENT_CAR',
        payload: car
    }
}
export const changeStep = (step) => {
    return {
        type: 'CHANGE_STEP',
        payload: step
    }
}
export const setStartDate = (startDate) => {
    return {
        type: 'SET_START_DATE',
        payload: startDate
    }
}
export const setEndDate = (endDate) => {
    return {
        type: 'SET_END_DATE',
        payload: endDate
    }
}
export const setDifferenceTime = (time) => {
    return {
        type: 'SET_DIFFERENCE_TIME',
        payload: time
    }
}
export const setOrderPrice = (price) => {
    return {
        type: 'SET_ORDER_PRICE',
        payload: price
    }
}