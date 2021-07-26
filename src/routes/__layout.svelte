<script>
	import '../global.css';
	import Header from '$lib/Header.svelte'
	import AlertList from '$lib/alert/AlertList.svelte'
</script>

<Header/>
<AlertList/>
<main class="w-full h-screen mx-auto relative px-2 sm:px-6 lg:px-8 bg-gray-100">
	<slot />
</main>
