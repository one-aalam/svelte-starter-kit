export function isMin (minVal: string | number) {
    return function min (val) {

        const value = val && isNaN(val) ? val.length : parseFloat(val)
        return (value >= minVal) || { min: true }
    }
}
