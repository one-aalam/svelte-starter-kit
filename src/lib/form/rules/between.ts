import { isMin } from './min'
import { isMax } from './max'

export function isBetween (minVal: string | number, maxVal: string | number) {
    const _isMin = isMin(minVal)
    const _isMax = isMax(maxVal)
    return function between(val) {
        return (_isMin(val) && _isMax(val)) || { between: true }
    }
}
