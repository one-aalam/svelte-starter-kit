
import type{ Readable } from 'svelte/store'
import { writable } from 'svelte/store'
import type{ FormFieldState } from './type'

type ValidatorAction = (node: HTMLInputElement, binding: string | number | boolean | null ) => void;

/**
 *
 * @param rules validators to apply for the associated field
 * @returns action creator
 */
export const createValidators = (...rules): [ Readable<FormFieldState>, ValidatorAction ] => {
    const { update, subscribe } = writable<FormFieldState>({ touched: false, dirty: false, valid: false, error: {}, errorKey: '' })
    const getFieldState = createValidator(rules)

    function action(node: HTMLInputElement, binding) {
        function setFieldState(value, dirty) {
            update((val) => ({ ...val, ...getFieldState(value, dirty)}))
        }

        node.addEventListener('input', () => {
           update(val => ({ ...val, touched: true }))
        }, { once: true })

        setFieldState(binding, false)

        return {
            update(value) {
                setFieldState(value, true)
            }
        }
    }

    return [ { subscribe }, action ]
}

/**
 *
 * @param rules the rules to check for
 * @returns the field state post validation functions are run
 */
function createValidator (rules) {
    return function validate (value, dirty) {
      if (!rules || rules.length === 0) {
        return { dirty, valid: true }
      }

      const hasError = rules.find(rule => rule(value) !== true)

      return {
        dirty,
        valid: !hasError,
        error: hasError ? hasError() : {},
        errorKey: hasError ? Object.keys(hasError())[0] : ''
      }
    }
}
