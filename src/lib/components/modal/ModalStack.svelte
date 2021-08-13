<script lang="ts">
    import { modals } from './modal.store'
</script>

{#if $modals.length}
    <slot name="backdrop" />
{/if}

<slot>
    {#each $modals as modal, i (i)}
        <svelte:component this={modal.component} isOpen={i === $modals.length - 1} index={i} {...modal.props || {} }/>
    {/each}
</slot>
