<script lang="ts">
    import { page } from '$app/stores'
    import { signOut } from '$lib/user'
    import { user } from '$lib/user'
</script>
<nav class="h-14 bg-white w-screen mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 shadow-sm" >
    <ul class="list-none h-full flex items-center justify-end gap-3">
        {#if $user}
            <li class="nav__item">
                <a rel="prefetch" href="/settings" class:active={$page.path === '/settings'}>
						<i class="ion-gear-a" />
				</a>
            </li>
            <li class="nav__item">
                <a rel="prefetch" href="/profile/@me">
                    {$user.email}
                </a>
            </li>
            <button class="" on:click={() => signOut()}>Sign Out</button>
        {:else}
            <li class="nav__item">
                <a rel="prefetch" href="/auth" title="Sign In">
                    Sign In
                </a>
            </li>
            <li class="nav__item">
                <a rel="prefetch" href="/auth?reg=true" title="Sign Up">
                    Sign Up
                </a>
            </li>
        {/if}
    </ul>
</nav>

<style lang="postcss">
</style>
