<script>
	import '../global.css';
	import Header from '$lib/Header.svelte'
	import Footer from '$lib/Footer.svelte'
</script>

<Header/>
<main class="w-full h-screen mx-auto relative px-2 sm:px-6 lg:px-8 bg-gray-100">
	<slot />
</main>
<Footer/>
