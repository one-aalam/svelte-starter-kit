<script context="module" lang="ts">
    import { getContext } from 'svelte'
    import { formKey } from './Form.svelte'
    import type{ FormFieldType, FormFieldErrorType } from './type'
    import { FIELD_ERRORS } from './constants'
    import { getApplicableValidations } from './utils'
    import { createValidators } from '../validator'
</script>

<script lang="ts">
    const { setValueAndValidity } = getContext(formKey)

    export let value: string = ''
    export let type: FormFieldType = 'text'
    export let label: string = ''
    export let name: string = ''
    export let validate: Array<FormFieldErrorType> = []
    export let srOnly: boolean = false

    const [ isField, validateField ] = createValidators(...getApplicableValidations(validate))

    setValueAndValidity(name, value, $isField.valid)
    const handleInput = evt => {
        setValueAndValidity(name, evt.target.value, $isField.valid)
        value = evt.target.value;
    };
</script>

<div class="form__field-group" class:has-error={!$isField.valid}>
    {#if label}
        <label for={name} class="form__field-label" class:sr-only={srOnly}>{label}</label>
    {/if}
    {#if type === 'number'}
        <input
            class="form__field form__field--number"
            type="number" {name}
            placeholder={label} autocorrect="off" autocapitalize="none"
            class:has-error={!$isField.valid }
            use:validateField={value}
            bind:value on:input={handleInput} />
    {:else if type === 'password'}
        <input
            class="form__field form__field--password"
            type="password" {name}
            placeholder={label} autocorrect="off" autocapitalize="none"
            class:has-error={!$isField.valid }
            use:validateField={value}
            bind:value on:input={handleInput} />
    {:else}
        <input
            class="form__field form__field--text"
            type="text"  {name}
            placeholder={label} autocorrect="off" autocapitalize="none"
            class:has-error={!$isField.valid }
            use:validateField={value}
            bind:value on:input={handleInput} />
    {/if}
    {#if !$isField.valid && $isField.touched}
        <small class="form__field-error">{FIELD_ERRORS[$isField.errorKey]}</small>
        <!--
            You could do this too...but, why, not, DRY?
        {#if $isField.error.required}
            <small class="form__field-error">{errMessage['required']}</small>
        {/if}
        {#if $isField.error.email}
            <small class="form__field-error">{errMessage['email']}</small>
        {/if} -->
    {/if}
</div>
<style lang="postcss">
    .form__field-group {
        @apply relative text-left;
    }
    .form__field {
        @apply h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400 text-gray-700;
    }
    .form__field-label {
        @apply uppercase font-semibold text-sm drop-shadow-md text-gray-500
    }
    .form__field.has-error {
        @apply border-red-600 outline-none;
    }
    .form__field-error {
        @apply absolute left-1 -bottom-5 text-xs text-red-600;
    }
</style>
