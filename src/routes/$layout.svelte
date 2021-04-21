<script>
	import '../global.css';
	import Header from '$lib/Header.svelte'
	import Footer from '$lib/Footer.svelte'
	import AlertList from '$lib/alert/AlertList.svelte'
</script>

<Header/>
<AlertList/>
<main class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-100">
	<slot />
</main>
<Footer/>
