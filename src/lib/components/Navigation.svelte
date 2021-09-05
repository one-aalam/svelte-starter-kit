<script lang="ts">
    import { fly } from 'svelte/transition'
    export let toggleNav
</script>

<nav class="fixed left-0 right-0 bottom-0 top-0 bg-gray-400 p-40 shadow-md z-10" transition:fly={{x: 1000}} >
    <button class="block border-0 text-lg text-white font-semibold" on:click={toggleNav} >Home</button>
    <button class="block border-0 text-lg text-white font-semibold" on:click={toggleNav} >About</button>
    <button class="block border-0 text-lg text-white font-semibold" on:click={toggleNav} >Contact</button>
</nav>