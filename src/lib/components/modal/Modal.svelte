<script lang="ts">
    import { XIcon } from 'svelte-feather-icons'
    import { fly } from 'svelte/transition'
    import { closeModal } from './modal.store'
    import { modalEvtBindings } from './modal.action'

    export let isOpen
    export let index
    export let isSidePanel: boolean = false
    $: transitionConfig = isSidePanel ? {x: 100} : {y: 100}
  </script>

  {#if isOpen}
    <div role="alertdialog" aria-modal="true" aria-labelledby={`modal__content-title-${index}`} aria-describedby={`modal__content-body-${index}`} class="modal" use:modalEvtBindings on:esc={closeModal} tabindex={0} transition:fly={transitionConfig}>
      <div class="modal__content" class:modal__content--default={!isSidePanel} class:modal__content--sidepanel={isSidePanel}>
        <button class="modal__action-close" class:modal__action-close--default={!isSidePanel} class:mmodal__action-close--sidepanel={isSidePanel} on:click={closeModal}>
            <XIcon class="w-4 inline-block"/>
        </button>
        <slot/>
        <div class="modal_actions">
            <slot name="actions" dismiss={closeModal}/>
        </div>
      </div>
    </div>
  {/if}

<style lang="postcss">
    .modal{
        @apply fixed top-0 right-0 bottom-0 left-0 flex justify-center place-items-center items-center pointer-events-none
    }

    .modal__content {
        @apply flex flex-col relative justify-between shadow-lg px-8 pt-12 pb-1 bg-white text-gray-700 pointer-events-auto
    }

    .modal__content.modal__content--default {
        @apply w-3/4 md:w-3/5 lg:w-2/6 rounded-lg
    }

    .modal__content.modal__content--sidepanel {
        @apply fixed top-0 right-0 h-full w-full sm:w-2/4 md:w-5/12 lg:w-4/12 xl:w-3/12 border-l overflow-y-auto
    }

    .modal_actions {
        @apply flex justify-end mt-4 border-t py-2 border-green-200
    }

    .modal__action-close {
        @apply absolute top-2 inline-grid place-content-center rounded-full w-8 h-8 border-0 m-0 p-0 transition-colors
    }

    .modal__action-close.modal__action-close--default {
        @apply right-2
    }

    .modal__action-close.modal__action-close--sidepanel {
        @apply top-3 -left-2
    }

    .modal__action-close:hover {
        @apply text-gray-500 bg-gray-200
    }
</style>
