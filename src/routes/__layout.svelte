<script lang="ts">
	import '../global.css';
    import { navigating } from '$app/stores'
    import PageNavIndicator from '$lib/components/PageNavIndicator.svelte'
	import Header from '$lib/components/Header.svelte'
	import AlertList from '$lib/alert/AlertList.svelte'
    import ModalBackdrop from '$lib/components/modal/ModalBackdrop.svelte'

</script>

{#if $navigating}
	<PageNavIndicator />
{/if}
<Header/>
<AlertList/>
<main class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-100">
    <slot></slot>
</main>
<ModalBackdrop/>
<!-- <Footer/> -->

<style style lang="postcss">
</style>
