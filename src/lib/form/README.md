## Form Validator Actions & Rules
A very simple form validator, that uses actions to validate various single-input fields for
- required
- email
- url
- min
- max
- between
Stable core, but currently just supports input fields. For anything more stable try, any of the svelte form modules from the community

### How to use?
Import the required imports
```ts
    import { createValidators } from '$lib/form/validator'
    import { isRequired, isMin, isMax } from '$lib/form/rules'
```

Create validator for any of the form fields (textual input types only)
```ts
    const [ isUsernameField, validateUsername ] = createValidators(isRequired(), isMin(3), isMax(15))
```
Attach the validator to the target input type, like shown below
```html

    <div class="mb-4">
        <label for="username" class="block text-green-100 mb-2 text-left">Username</label>
        <input
            name="username"
            type="text"
            placeholder="Your Username"
            bind:value={value}
            class:has-error={!$isUsernameField.valid }
            use:validateUsername={value}
        />
    </div>
    {#if $isUsernameField.touched && !$isUsernameField.valid}
        {#if $isUsernameField.error.required}
            <small class="form__field-error">Username is required</small>
        {/if}
        {#if $isUsernameField.error.min}
            <small class="form__field-error">Min 3 chars. are required </small>
        {/if}
        {#if $isUsernameField.error.max}
            <small class="form__field-error">Max 15 chars. are required </small>
        {/if}
    {/if}
```

## Action: Ajaxify
Just takes the field values and submit to the API provided by form `action`

Import
```ts
    import { ajaxify } from '$lib/form/ajaxify'
```
Apply
```html
    <form method="POST" action="https://jsonplaceholder.typicode.com/todos" use:ajaxify={{onResponse: (data) => console.log(data)}}>
        <input name="title" />
        <button type="submit">save</button>
    </form>
```
and, done!
