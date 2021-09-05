export type FormFieldState = {
    touched: boolean
    dirty: boolean
    valid: boolean
    error: {
        required?: boolean
        email?: boolean
        min?: boolean
        max?: boolean
    },
    errorKey: string
}
