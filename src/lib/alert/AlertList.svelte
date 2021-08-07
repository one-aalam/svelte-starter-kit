<script lang="ts">
    import { alerts } from './alert.store'
    import Alert from './Alert.svelte'
</script>
<div class="alert__list" role="status" aria-live="polite">
    {#each $alerts as alert}
        <Alert {alert} />
    {/each}
</div>
<style lang="postcss">
    .alert__list {
        @apply absolute w-screen top-6 flex flex-col place-items-center justify-center z-10
    }
</style>
