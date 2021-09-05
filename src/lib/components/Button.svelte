<script context="module" lang="ts">
    type ButtonType = 'submit' | 'button'
</script>

<script lang="ts">
    export let label: string
    export let loading: boolean = false
    export let disabled: boolean = false
    export let type: ButtonType = 'button'
</script>

<button
    type={type}
    class={`form__btn form__btn--${type}`}
    class:loading={loading}
    disabled={disabled} on:click>
    {label}
</button>

<style lang="postcss">
    .form__btn {
        @apply bg-gray-500 border border-gray-600 text-white px-4 py-2 rounded shadow-lg
    }
    .form__btn[disabled] {
        @apply opacity-60 cursor-not-allowed shadow-none
    }
    .form__btn--submit {
        @apply shadow-lg
    }
    .form__btn.loading {
        @apply bg-green-200
    }
</style>
