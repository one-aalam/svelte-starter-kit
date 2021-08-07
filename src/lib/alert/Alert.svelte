<script lang="ts">
    import { fly } from 'svelte/transition'
    import { CheckCircleIcon, AlertCircleIcon } from 'svelte-feather-icons'
    import type { Alert } from './alert.type'

    export let alert: Alert
</script>

<div
    class="alert"
    class:alert--success={alert.type === 'success'}
    class:alert--error={alert.type === 'error'}
    transition:fly={{y: 100}}
>
    <p>
        {#if alert.type === 'success'} <CheckCircleIcon class="w-6 inline-block"/> {:else} <AlertCircleIcon class="w-6 inline-block"/> {/if}
        &nbsp; {alert.text}
    </p>
</div>
<style lang="postcss">
    .alert {
        @apply shadow-md rounded px-3 py-2 transition-all mt-2 bg-gray-100 text-gray-800
    }
    .alert--success {
        @apply bg-green-300 text-gray-800
    }
    .alert--error {
        @apply bg-red-500 text-white
    }
</style>
