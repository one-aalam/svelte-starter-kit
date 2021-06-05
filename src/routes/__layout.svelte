<script lang="ts">
	import '../global.css';
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import AlertList from '$lib/alert/AlertList.svelte'

</script>

<Header/>
<AlertList/>
<main class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-100">
	<slot />
</main>
<Footer/>

<style style lang="postcss">
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

    /*
	main {
		@apply text-center;
		@apply p-4;
		@apply mx-auto;
	}*/

	h1 {
		@apply text-red-600;
		@apply text-6xl;
		@apply font-thin;
		@apply leading-tight;
		@apply my-16 mx-auto;
		@apply max-w-xs;
	}

	p {
		@apply max-w-xs;
		@apply my-8 mx-auto;
		@apply leading-snug;
	}

	@screen sm {
		h1 {
			@apply max-w-none;
		}

		p {
			@apply max-w-none;
		}
	}
</style>
