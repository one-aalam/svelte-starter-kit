<script context="module" lang="ts">
    export type FormFieldState = {
        value: string | number | boolean,
        isValid: boolean
    }
    export type FormState = { [key: string]: FormFieldState }
    export type FormStateNormalized = { [key: string]: string | number | boolean }
    export type FormEvent = 'submit'

    export const formKey: FormState = {}
</script>
<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { writable, derived } from 'svelte/store'
    import { setContext } from 'svelte'

    let form;
    export let heading: string = ''

    const formState = writable<FormState>({})
    const formIsValid = derived(formState, $state => Object.keys($state).length > 0 && Object.entries($state).every(([_, field]) => field.isValid))

    // @ts-ignore
    const getFormState = (): FormStateNormalized => Object.entries($formState).reduce((acc, [ key, val ]) => {
        return {...{ [acc[0]]: acc[1].value }, [key]: val.value }
    })

    const dispatch = createEventDispatcher<{ submit: FormStateNormalized }>()

    const handleSubmit = async(e) => {
        if (!$formIsValid) return
        dispatch('submit', getFormState())
    }

    setContext(formKey, {
        setValueAndValidity: (fieldName, value, isValid) => formState.update(prevState => ({...prevState, [fieldName]: { value, isValid } })),
    });

</script>
<form bind:this={form} on:submit|preventDefault={handleSubmit}>
    <fieldset>
        {#if heading}
            <legend>{heading}</legend>
        {/if}
        <slot isValid={$formIsValid} {handleSubmit}/>
    </fieldset>
</form>
