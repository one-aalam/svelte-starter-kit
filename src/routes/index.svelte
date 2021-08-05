<script lang="ts">
	import SvelteSeo from "svelte-seo";
	import { handleAlert } from '../lib/alert'
	import Modal from '$lib/Modal.svelte'

	let isModalOpened = false

	function toggleModal() {
		isModalOpened = !isModalOpened;
	}

</script>

<SvelteSeo
  title="Svelte Starter Kit"
  description="Svelte with brilliant bells and useful whistles"
/>

<div>
	<h1>Svelte Starter Kit!</h1>
	<button on:click={() => handleAlert({text: 'Hey, Buddy', type: 'success'})}>Show Alert</button>
	<button on:click={toggleModal}>Show Modal</button>
	<p>
		Visit <a class="text-blue-600 underline" href="https://svelte.dev">svelte.dev</a> to learn how to
		build Svelte apps.
	</p>
</div>

{#if isModalOpened}
	<Modal {toggleModal}>
		<p>This is in the modal</p>
		<button>Do something</button>
	</Modal>
{/if}

<style style lang="postcss">
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
