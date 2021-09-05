<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    export let loading = false
    export let src
    export let title

    const dispatch = createEventDispatcher();

	function onChange(evt) {
		dispatch('change', evt);
	}
</script>

<div class="avatar relative">
    <label class="block text-gray-500 text-sm my-1 hover:opacity-80" for="single">
        <img class="w-28 h-28 ring-4 ring-gray-300 rounded-full bg-gray-900 bg-opacity-10 mb-2" alt="{title}" src="{src}" />
      {loading ? 'Updating..' : '(click to update)'}
    </label>
    <input
     class="sr-only"
      type="file"
      id="single"
      accept="image/*"
      on:change={onChange}
      disabled={loading}
    />
</div>
