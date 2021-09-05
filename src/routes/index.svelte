<script lang="ts" context="module">

    export async function load({ session }) {
        const { user } = session
        return {
            props: {
                user
            }
        };
    }
</script>

<script lang="ts">
    import Seo from '$lib/components/SEO.svelte'
    import { ArchiveIcon } from 'svelte-feather-icons'
    import DefaultModal from '$lib/components/modal/presets/DefaultModal.svelte'
    import Sidepanel from '$lib/components/modal/presets/Sidepanel.svelte'
    import { openModal } from '$lib/components/modal/modal.store'
    import Popover from '$lib/components/popover/Popover.svelte'

    export let user

    function showModal() {
        openModal(DefaultModal, { title: "Alert", message: "The Modal content goes here..." })
    }

    function showModalSide() {
        openModal(Sidepanel, { title: "Alert", message: "The Sidepanel content goes here..." })
    }
</script>

<Seo title="Home"/>
<div class="flex flex-col justify-center items-center relative">
    <!-- App logo and tagline -->
    <div class="w-full text-center mb-4 flex flex-col place-items-center">
        <div class="banner flex flex-col place-items-center mt-32 mb-2">
            <div>
                <ArchiveIcon size="4x" class="w-12 h-12 text-gray-600" />
            </div>
            <h3 class="text-6xl text-red-500"><strong>Svelte</strong></h3>
            <h3 class="px-3 py-1 text-2xl bg-gray-400 text-white uppercase">Starter Kit</h3>
            <small class="uppercase font-semibold text-gray-800 mt-4"> Typescript - TailwindCSS - <small class="bg-green-700 text-white px-2">Supabase</small> Authentication + Profile - Alert, <a href="/" on:click|preventDefault={showModal}>Modal</a>, <a href="/" on:click|preventDefault={showModalSide}>Sidepanel</a>, <span class="inline-block relative"><Popover dir="left">
                <a slot="action" href="/" let:toggleVisibility on:click|preventDefault={toggleVisibility}>Popover</a>
                <ul class="popover__menu">
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                    <li>Option 4</li>
                </ul>
            </Popover></span>, Form Helpers, etc.</small>
        </div>
        <p class="mb-6"><strong>Svelte Starter Kit</strong> is an opinionated boilerplate based off of SvelteKit, with all the bells and whistles you want ready, up and running when starting any Full-stack Svelte/Javascript project.</p>
        {#if user && !user.guest}
            <a class="bg-gray-500 border border-gray-600 text-white px-4 py-2 rounded shadow" href="/profile" title="View Profile">View Profile</a>
        {:else}
            <a class="bg-gray-500 border border-gray-600 text-white px-4 py-2 rounded shadow" href="/auth" title="Sign Up or Sign In">Get Started</a>
        {/if}
    </div>
</div>

<style lang="postcss">
    .popover__menu {
        @apply bg-white shadow-md rounded-md p-2 w-32
    }
</style>
