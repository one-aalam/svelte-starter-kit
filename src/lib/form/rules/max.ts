export function isMax (maxVal: string | number) {
    return function max (val) {
        const value = val && isNaN(val) ? val.length : parseFloat(val)
        return (value <= maxVal) || { max: true }
    }
}
