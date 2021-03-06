const initialState = {
    isMenuActive: false,
    cities: [],
    points: [],
    cars: [],
    currentCity: null,
    currentPoint: null,
    currentCar: {},
    step: 0,
    startDate: null,
    endDate: null,
    differenceTime: null,
    orderPrice: 0
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'MENU_STATUS_CHANGE':
            const newStatus = !state.isMenuActive
            return {
                ...state,
                isMenuActive: newStatus
            }
        case 'CITIES_ARE_LOADED':
            return {
                ...state,
                cities: action.payload
            }
        case 'POINTS_ARE_LOADED':
            return {
                ...state,
                points: action.payload
            }
        case 'SET_CURRENT_CITY':
            return {
                ...state,
                currentCity: action.payload
            }
        case 'SET_CURRENT_POINT':
            return {
                ...state,
                currentPoint: action.payload
            }
        case 'CARS_ARE_LOADED':
            return {
                ...state,
                cars: action.payload
            }
        case 'SET_CURRENT_CAR':
            return {
                ...state,
                currentCar: action.payload
            }
        case 'CHANGE_STEP':
            return {
                ...state,
                step: action.payload
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.payload
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.payload
            }
        case 'SET_DIFFERENCE_TIME':
            return {
                ...state,
                differenceTime: action.payload
            }
        case 'SET_ORDER_PRICE':
            return {
                ...state,
                orderPrice: action.payload
            }
        default:
            return state
    }
}