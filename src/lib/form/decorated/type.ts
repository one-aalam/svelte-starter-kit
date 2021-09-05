import type{ FIELD_VALIDATION_MAP } from './config'

export type FormFieldType =  'text' | 'password' | 'number'
export type FormFieldErrorType = keyof typeof FIELD_VALIDATION_MAP
