import { FIELD_VALIDATION_MAP  } from './config'
import type{ FormFieldErrorType } from './type'


/**
 *
 * @param rules Array containing the name of all the validators applied on a form field
 * @returns
 */
 export const getApplicableValidations = (rules: Array<FormFieldErrorType>) => rules.map(
    rule => FIELD_VALIDATION_MAP[rule] && FIELD_VALIDATION_MAP[rule]()
)
