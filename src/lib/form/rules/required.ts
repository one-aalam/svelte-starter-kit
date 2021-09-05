
export function isRequired () {
    return function required (value) {
      return (value !== undefined && value !== null && value !== '') || { required: true }
    }
}
