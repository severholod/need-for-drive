export const isEmpty = (obj) => {
    const keys = Object.keys(obj)
    if (keys.length) {
        return false
    }
    return true
}
export const getDifTime = (startDate, endDate) => {
    let differenceDay = 0
    let differenceHours = Math.round((endDate - startDate) / 1000 / 60 / 60)
    if (differenceHours >= 24) {
        differenceDay = Math.floor(differenceHours / 24)
        differenceHours = differenceHours % 24
    }
    const differenceTime = `${differenceDay ? differenceDay + 'д': ''} ${differenceHours}ч`
    return differenceTime
}