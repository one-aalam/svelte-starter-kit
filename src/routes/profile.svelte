<script lang="ts" context="module">

    export async function load({ fetch }) {
        const url = `/api/auth.json`;
		const res = await fetch(url);

		if (res.ok) {
            const user = await res.json().user
            if (user) {
                return {
                    props: {
                        user
                    }
			    };
            } else {
                return {
                    headers: { Location: '/' },
                    status: 302
                }
            }
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
    }
</script>

<script lang="ts">
    import { browser } from '$app/env';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/supabase'
    import { user as clientSideUser } from '$lib/auth'

    if(browser && !$clientSideUser) goto('/')

    async function signOut() {
        await auth.signOut()
        goto('/')
    }

    export let user // not used
</script>


<div class="flex flex-col justify-center items-center relative">
    <h2 class="text-3xl my-4">Howdie, { $clientSideUser ? $clientSideUser?.email : 'Explorer'}!</h2>
    {#if !$clientSideUser}
        <small>You've landed on a protected page. Please <a href="/">log in</a> to view the page's full content </small>
    {/if}
    <div>
        <button on:click={signOut} class="border bg-gray-500 border-gray-600 text-white px-3 py-2 rounded w-full text-center transition duration-150 shadow-lg">Sign Out</button>
    </div>
</div>
