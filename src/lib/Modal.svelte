<script>
    import { scale, fly } from 'svelte/transition';
    export let toggleModal;
</script>
  
  
<div class="modal fixed flex w-full h-full left-0 top-0 items-center justify-center" role="alertdialog" aria-describedby="" aria-labelledby="">
    <div class="modal-content bg-green-500 text-white w-3/4 md:w-2/4  p-16 rounded-lg shadow-lg" transition:fly={{y: 40}}>
        <button on:click={toggleModal} class="drawer--close">X</button>
        <slot />
    </div>
    <div on:click={toggleModal} transition:scale={{ start: 1.5, duration: 1000 }} class="modal-bg absolute w-full h-full opacity-80" />
</div>

<style>
    .modal-bg {
        z-index: -1;
        background: linear-gradient(142deg, var(--red) 3.62%, var(--green) 100%);
    }
</style>