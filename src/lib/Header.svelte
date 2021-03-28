<script lang="ts">
    import { MenuIcon } from 'svelte-feather-icons'
    import Navigation from './Navigation.svelte'
    let isNavOpened = false

    function toggleNav() {
        isNavOpened = !isNavOpened
    }
</script>

<header class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
    {#if isNavOpened}
        <Navigation {toggleNav} />
    {/if}
    <button on:click={toggleNav}><MenuIcon class="w-5 inline-block" /> Menu</button>
    <slot/>
</header>