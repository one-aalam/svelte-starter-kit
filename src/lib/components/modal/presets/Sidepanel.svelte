<script lang="ts">
    import Modal from '../Modal.svelte'

    // These are forward params, just pass it on to the parent modal
    export let isOpen // open behavior
    export let index: number = 0 // unique ids for accessibility

    export let title: string = ''
    export let message: string = ''
</script>
<Modal isOpen={isOpen} {index} isSidePanel={true}>
    {#if title}
        <h1 class="modal__content-title" id={`modal__content-title-${index}`}>{title}</h1>
    {/if}
    <p class="modal__content-body" id={`modal__content-body-${index}`}>{@html message}</p>
    <div class="modal__actions" slot="actions" let:dismiss>
        <button on:click={dismiss}>close</button>
    </div>
</Modal>


<style lang="postcss">
    .modal__content-title {
        @apply border-b py-1 text-2xl font-semibold relative -top-8 text-right pointer-events-none
    }
    .modal__content-body {
        @apply text-base
    }
</style>
