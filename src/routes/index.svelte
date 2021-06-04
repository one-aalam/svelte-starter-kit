<script lang="ts">
	import SvelteSeo from "svelte-seo";
    import { ArchiveIcon } from 'svelte-feather-icons';

</script>

<SvelteSeo
  title="Svelte Starter Kit | Home"
  description="Svelte with brilliant bells and useful whistles"
/>
<div class="flex flex-col justify-center items-center relative">
    </div>
<!-- <img src="/static/undraw_access_denied_re_awnf.svg" alt="" /> -->
<!-- App logo and tagline -->
<div class="w-full text-center mb-4 flex flex-col place-items-center">
    <div class="banner flex flex-col place-items-center mt-32 mb-4">
        <div>
            <ArchiveIcon size="4x" class="w-12 h-12 text-gray-600" />
        </div>
        <h3 class="text-6xl text-red-500"><strong>Svelte</strong></h3>
        <h3 class="px-3 py-1 text-2xl bg-gray-400 text-white uppercase">Starter Kit</h3>

        <h4 class="mt-3"> Svelte Kit + Supabase</h4>
        <small class="uppercase font-semibold text-gray-800">Typescript - TailwindCSS - Authentication System - Alert, Modal, etc.</small>

    </div>

    <a class="bg-gray-500 border border-gray-600 text-white px-4 py-2 rounded shadow" href="/auth" title="Sign Up or Sign In">Get Started</a>
</div>
