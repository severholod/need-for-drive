export const changeSlide = (slideId) => {
    return {
        type: 'CHANGE_SLIDE',
        payload: slideId
    }
}
export const menuStatusChange = () => {
    return {
        type: 'MENU_STATUS_CHANGE'
    }
}