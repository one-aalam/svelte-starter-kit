<script lang="ts" context="module">
    import { API_AUTH, ROUTE_HOME } from '$lib/constants'

    function response(user) {
        if (user && !user.guest) {
            return {
                props: {
                    user
                }
            };
        } else {
            return {
                redirect:  ROUTE_HOME,
                status: 302
            }
        }
    }

    export async function load({ fetch, session }) {
        // Approach #1 - Call the session getter API
		const res = await fetch(API_AUTH);
		if (res.ok) {
            const { user } = await res.json();
            return response(user)
        } else {
            return {
                status: res.status,
                error: new Error(`Could not load ${API_AUTH}`)
            };
        }

        // Approach #2 - Use the session parameter (refer hooks/index.ts to see how it got populated)
        // const { user } = session
        // return response(user)
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte'
    import { ChromeIcon } from 'svelte-feather-icons'
    import type{ ProfileAttrs } from '$lib/user'
    import { signOut, getCurrUserProfile, updCurrUserProfile, updCurrUserAvatar, getAvatar, profile } from '$lib/user'
    import { handleAlert } from '$lib/alert'
    import Seo from '$lib/components/SEO.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Avatar from '$lib/components/Avatar.svelte'
    import { URL_DICEBEAR } from '$lib/constants'

    // Approach #3 (non-effective): Enable when using client-side user session. If you're purely using the client-side supabase-maintained session comment out the approach #1. There would be a flash of unstyled content tho
    // import { browser } from '$app/env';
    // import { user } from '$lib/user'
    // if(browser && !$user) goto('/')

    let loading = false
    let profileState: ProfileAttrs = {
        username: '',
        website: '',
        avatar_url: ''
    }

    async function getProfile() {
        try {
            loading = true
            let { data: { username, website, avatar_url } , error } = await getCurrUserProfile()
            if (error) {
                handleAlert({ type: 'default', text: 'First login? You wanna update your profile details? 🙂' })
            }

            avatar_url = await getAvatar(avatar_url)
            profileState = { username, website, avatar_url }
            profile.set({ ...profileState })

        } catch (error) {
            if(error instanceof TypeError) {
                handleAlert({ type: 'default', text: 'First login? You wanna update your profile details? 🙂' })
            } else if(error.message === 'The resource was not found') {
                handleAlert({ type: 'default', text: 'You know? You can click on the randomly generated avatar to update your profile picture.' })
            } else {
                handleAlert({ type: 'error', text: error.message })
            }
        } finally {
            loading = false
        }
    }

    async function updProfile() {
        try {
            loading = true

            let { data: [{ username, website }], error: updateError } = await updCurrUserProfile({
                username: profileState.username,
                website: profileState.website
            })
            if (updateError) {
                throw updateError
            }

            profile.update((profile) => ({ ...profile, username, website }))

        } catch (error) {
            handleAlert({ type: 'error', text: error.message })
        } finally {
            isModalOpened = false
            loading = false
        }
    }

    async function updAvatar(event: any) {
        const { target } = event.detail
        try {
            if (!target!.files || target.files.length == 0) {
                throw 'You must select an image to upload.'
            }
            loading = true
            let { data: [ { avatar_url } ], error: updateError } = await updCurrUserAvatar(target.files[0])

            if (updateError) {
                throw updateError
            }

            avatar_url = await getAvatar(avatar_url)
            profile.update((profile) => ({ ...profile, avatar_url }))

        } catch (error) {
            handleAlert({ type: 'error', text: error.message })
        } finally {
            loading = false
        }
    }

    onMount(getProfile)

    let isModalOpened = false

    function toggleModal() {
        isModalOpened = !isModalOpened;
    }

    $: username = $profile.username ? $profile.username : ( user ? user?.email : 'Explorer' )
    $: avatar_url = $profile.avatar_url ? $profile.avatar_url : URL_DICEBEAR + username + '.svg'

    export let user /* When using approach #3 (client-side user session) comment this out and replace `user` with `(dollar)user` in the template */
</script>
<Seo title="Profile"/>
<div class="flex flex-col justify-center items-center relative">
    <div class="p-2 flex flex-col place-items-center">
        <div class="mt-2">
            <Avatar on:change={updAvatar} src="{avatar_url}" title={username} loading={loading} />
        </div>
      </div>
    <div class="profile-detail my-4" on:click={toggleModal}>
        <h2 class="text-4xl mb-1">Howdie, { username }!</h2>
        <span class="inline-block px-2 py-1 bg-gray-400 text-white rounded-full"><ChromeIcon class="inline-block" size="1x"/> {$profile.website}</span>
        <div class="text-gray-500 text-sm my-1">(click to update)</div>
    </div>

    {#if !user}
        <small>You've landed on a protected page. Please <a href="/">log in</a> to view the page's full content </small>
    {/if}

    {#if user}
        <div>
            <button on:click={signOut} class="border bg-gray-500 border-gray-600 text-white px-3 py-2 rounded w-full text-center transition duration-150 shadow-lg">Sign Out</button>
        </div>
        <div class="rounded-md shadow-2xl bg-green-800 w-3/5 overflow-hidden mt-4">
            <h3 class="px-2 py-1 text-white">User from Supabase</h3>
            <small class="bg-gray-800 text-white px-4 py-2 w-full inline-block">{JSON.stringify(user)}</small>
        </div>
    {/if}
</div>

{#if isModalOpened}
	<Modal {toggleModal}>
        <h2 class="text-3xl my-4">Update Profile</h2>
        <hr class="my-4"/>
        <div class="">
            <div class="mb-4">
                <label for="username" class="block text-green-100 mb-2 text-left">Username</label>
                <input
                id="username"
                name="username"
                type="text"
                class="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400 text-gray-700"
                placeholder="Your Username"
                required
                bind:value={profileState.username}
                />
            </div>
            <div class="mb-4">
                <label for="website" class="block text-green-100 mb-2 text-left">Website</label>
                <input
                id="website"
                name="website"
                type="website"
                class="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400 text-gray-700"
                placeholder="Your website"
                bind:value={profileState.website}
                />
            </div>
        </div>
		<button class="px-6 py-3 bg-green-200 text-gray-800" on:click={updProfile}>Update Profile</button>
	</Modal>
{/if}
