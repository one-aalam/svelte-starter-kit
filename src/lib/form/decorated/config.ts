// import type{ FormFieldErrorType } from './type'
import { isRequired, isEmail, isUrl } from '../rules'

export const FIELD_VALIDATION_MAP = {
    required: isRequired,
    email: isEmail,
    url: isUrl
}

// export const FIELD_VALIDATION_WITH_CONFIG_MAP: Array<FormFieldErrorType> = ['min', 'max', 'between']
