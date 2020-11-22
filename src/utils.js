export const isEmpty = (obj) => {
    const keys = Object.keys(obj)
    if (keys.length) {
        return false
    }
    return true
}