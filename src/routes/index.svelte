<script lang="ts">
    import { goto } from '$app/navigation';
    import type{ AuthChangeEvent, Session } from '@supabase/supabase-js'
	import SvelteSeo from "svelte-seo";
    import { LockIcon, GithubIcon } from 'svelte-feather-icons'
	import { handleAlert } from '$lib/alert'
    import { supabaseClient } from '$lib/supabase'
    import { setAuthCookie } from '$lib/utils'
    import Spinner from '$lib/Spinner.svelte'

    let isSignIn = true
    function toggleView() {
        isSignIn = !isSignIn
    }

    // validation, message and loading state
    let loading = false
    // form fields
    let email = '', password = ''

    async function signUpOrSignIn() {
        loading = true

        if (isSignIn) {
            const { error, session } = await supabaseClient.auth.signIn({
                email, password
            })
            if (error) {
                handleAlert({ type: "error", text: error.message})
            } else {
                handleAlert({ type: "success", text: "Signed in successfully"})
                await setAuthCookie(session)
                goto('/profile')
            }
        } else {
            const { error } = await supabaseClient.auth.signUp({
                email, password
            })
            if (error) {
                handleAlert({ type: "error", text: error.message})
            } else {
                handleAlert({ type: "error", text: "Registered. Please confirm your email"})
            }
        }
        loading = false
    }

    async function handleProviderSignIn(provider) {
        loading = true
        const { error } = await supabaseClient.auth.signIn({ provider })
        if (error) handleAlert({ type: "error", text: error.message})
        loading = false
    }

</script>

<SvelteSeo
  title="Svelte Starter Kit"
  description="Svelte with brilliant bells and useful whistles"
/>
<div class="flex flex-col justify-center items-center relative">
<!-- <img src="/static/undraw_access_denied_re_awnf.svg" alt="" /> -->
<!-- App logo and tagline -->
<div class="w-full text-center mb-4 flex  flex-col place-items-center">
    <div>
        <LockIcon size="3x" class="w-12 h-12 text-gray-600" />
    </div>
    <h3 class="text-3xl text-gray-600">Supa<strong>Auth</strong>&nbsp;</h3>
    <small>Please provide your <strong>email</strong> and <strong>password</strong> and {isSignIn ? 'Log In' : 'Sign Up' }</small>
</div>
<!-- Sign Up form -->
<form class="w-full sm:w-1/2 xl:w-5/12" on:submit|preventDefault={signUpOrSignIn} >
    <div class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg" style="background: url(/static/undraw_access_denied_re_awnf.svg) no-repeat rgba(76, 175, 80, 0.1)">
    <button class="flex-1 bg-gray-200 text-green-700 py-3 rounded w-full text-center shadow" on:click|preventDefault={() => handleProviderSignIn('github')}>
        <GithubIcon size="1x" class="inline-block "/> {isSignIn ? 'Log In' : 'Sign Up' } with <strong>Github</strong>
    </button>
    <hr class="my-4"/>
    <div class="mb-4">
        <label for="email" class="block font-semibold text-gray-800 mb-2 text-left">Email</label>
        <input
        id="email"
        name="email"
        type="email"
        class="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
        placeholder="Your Email"
        required
        bind:value={email}
        />
    </div>
    <div class="mb-4">
        <label for="password" class="block font-semibold text-gray-800 mb-2 text-left">Password</label>
        <input
        id="password"
        name="password"
        type="password"
        class="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
        placeholder="Your password. Leave empty for password-less login"
        bind:value={password}
        />
    </div>

    <!-- Sign Up & Sign In form: Actions -->

    <div class="flex pt-4 gap-2">
        <button type="submit" class="flex-1 bg-gray-500 border border-gray-600 text-white py-3 rounded w-full text-center shadow"
        >
            {isSignIn ? 'Log In' : 'Sign Up'}
        </button>
        <div class="flex-1 text-right">
        <small class="block text-gray-600">
            {isSignIn ? 'Not a member yet?' : 'Already a member?'}
        </small>
        <a class="block font-semibold" href="" on:click|preventDefault={toggleView} >
            {isSignIn ?  'Sign Up' : 'Log In' }
        </a>
        </div>
    </div>
    </div>
    </form>
    <div class="h-12 w-12 relative">
        {#if loading}
            <Spinner/>
        {/if}
    </div>
</div>

<style style lang="postcss">
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		@apply text-center;
		@apply p-4;
		@apply mx-auto;
	}

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
