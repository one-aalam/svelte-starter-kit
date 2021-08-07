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
    export let user
</script>

<Seo title="Home"/>
<div class="flex flex-col justify-center items-center relative">
<!-- App logo and tagline -->
<div class="w-full text-center mb-4 flex flex-col place-items-center">
    <div class="banner flex flex-col place-items-center mt-32 mb-4">
        <div>
            <ArchiveIcon size="4x" class="w-12 h-12 text-gray-600" />
        </div>
        <h3 class="text-6xl text-red-500"><strong>Svelte</strong></h3>
        <h3 class="px-3 py-1 text-2xl bg-gray-400 text-white uppercase">Starter Kit</h3>
        <small class="uppercase font-semibold text-gray-800 mt-4"> Typescript - TailwindCSS - <small class="bg-green-700 text-white px-2">Supabase</small> Authentication + Profile - Alert, Modal, etc.</small>
    </div>
    {#if user && !user.guest}
        <a class="bg-gray-500 border border-gray-600 text-white px-4 py-2 rounded shadow" href="/profile" title="View Profile">View Profile</a>
    {:else}
        <a class="bg-gray-500 border border-gray-600 text-white px-4 py-2 rounded shadow" href="/auth" title="Sign Up or Sign In">Get Started</a>
    {/if}
</div>
</div>
