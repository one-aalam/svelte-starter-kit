<script lang="ts" context="module">

    export async function load({ page, fetch, session, context }) {
        // Approach #1 - Use the session parameter (refer hooks/index.ts to see how it got populated)
        const { user } = session
        if (user && !user.guest) {
            return {
                props: {
                    user
                }
            };
        } else {
            return {
                redirect:  "/",
                status: 302
            }
        }

        // Approach #2(non-used) - Call the session getter API
        /*
        const url = `/api/auth.json`;
		const res = await fetch(url);

		if (res.ok) {
            const { user } = res.json()
            if (user && !user.guest) {
                return {
                    props: {
                        user // not used currently
                    }
                };
            } else {
                return {
                    redirect:  "/",
                    status: 302
                }
            }
        } else {
            return {
                status: res.status,
                error: new Error(`Could not load ${url}`)
            };
        }
        */

    }
</script>

<script lang="ts">
    // import { browser } from '$app/env'; // enable when using approach #3 (client-side user session)
    import { goto } from '$app/navigation';
    import Modal from '$lib/Modal.svelte'
    import { auth } from '$lib/supabase'
    import { unsetAuthCookie } from '$lib/utils'
    // import { user } from '$lib/auth' // enable when using approach #3 (client-side user session)

    // Approach #3 (non-effective): If you're purely using the client-side supabase-maintained session comment out the approach #1. There would be a flash of unstyled content tho
    // if(browser && !$user) goto('/') // enable when using approach #3 (client-side user session)

    async function signOut() {
        await auth.signOut()
        await unsetAuthCookie()
        goto('/')
    }

    let isModalOpened = false

    function toggleModal() {
        isModalOpened = !isModalOpened;
    }

    export let user //  When using approach #3 (client-side user session) comment this out and replace `user` with `$user` in the template
</script>

<div class="flex flex-col justify-center items-center relative">
    <div class="p-2 flex flex-col place-items-center">
        <img class="w-24 h-24 rounded-full bg-gray-900 bg-opacity-10" src="https://avatars.dicebear.com/api/avataaars/{ user ? user?.email : 'Explorer'}.svg" alt={ user ? user?.email : 'Explorer'} />

        <div class="mt-2">
          <h3 class="text-xl mb-2 text-gray-200">user name </h3>
        </div>
      </div>
    <h2 class="text-3xl my-4" on:click={toggleModal}>Howdie, { user ? user?.email : 'Explorer'}!</h2>
    {#if !user}
        <small>You've landed on a protected page. Please <a href="/">log in</a> to view the page's full content </small>
    {/if}
    {#if user}
        <div>
            <button on:click={signOut} class="border bg-gray-500 border-gray-600 text-white px-3 py-2 rounded w-full text-center transition duration-150 shadow-lg">Sign Out</button>
        </div>
    {/if}
</div>

{#if isModalOpened}
	<Modal {toggleModal}>
		<h2 class="text-3xl my-4">Howdie, { user ? user?.email : 'Explorer'}!</h2>
		<button>Do something</button>
	</Modal>
{/if}
