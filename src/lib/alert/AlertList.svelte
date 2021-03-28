<script lang="ts">
    import { fly } from 'svelte/transition'
    import { CheckCircleIcon, AlertCircleIcon } from 'svelte-feather-icons'
    import { alerts } from './alert.store'

</script>
<div class="alert-list absolute w-screen top-6 flex flex-col place-items-center justify-center z-10" role="status" aria-live="polite">
    {#each $alerts as alert}
        <div class="shadow-md rounded px-3 py-2 text-shadow transition-all mt-2 {alert.type === 'error' ? 'bg-red-500 text-white' : 
        alert.type === 'success' ? 'bg-green-300 text-gray-800' : 'bg-gray-100 text-gray-800'}" transition:fly={{y: 100}}
        >
            <p>{#if alert.type === 'success'}
                    <CheckCircleIcon class="w-6 inline-block"/>
                {:else}
                    <AlertCircleIcon class="w-6 inline-block"/>
                {/if}
            &nbsp; {alert.text}</p>
        </div>
    {/each}
</div>