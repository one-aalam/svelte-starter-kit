## Decorated

Set of decorated components (experimental) that let you express form related expressions declaratively. Built on top of `createValidators` and  a set of validation rules, they currently support all the single-line input fields, with `required`, `email` and `url` validation.

## How to use?
Import all the necessary imports like `Form`, `Field` and a `Button` component
```svelte
    <script lang="ts">
        import { writable } from 'svelte/store'
        import Form from '$lib/form/decorated/Form.svelte'
        import Field from '$lib/form/decorated/Field.svelte'
        import Button from '$lib/components/Button.svelte'
        import Sep from '$lib/components/Sep.svelte'

    </script>
```
Set-up the code to handle loading, and form submission within the same script block
```svelte

    const isSaving = writable<boolean>(false)

    const handleSubmit = async(state) => {
        isSaving.set(true)
        // `state.detail` contains state of all the fields mapped by name
        setTimeout(() => isSaving.set(false), 300)
    }
```
and prepare the form, and handle submission declaratively!

```svelte
    <Form let:handleSubmit let:isValid on:submit={handleSubmit}>
        <Field name="username" label="Your name" validate={['required']} srOnly={true} />
        <Sep/>
        <Field name="email" label="Your email" validate={['required', 'email']} srOnly={true} />
        <Sep/>
        <div class="form__actions">
            <Button label="save" loading={$isSaving} disabled={!isValid} on:click={handleSubmit} />
        </div>
    </Form>
```
