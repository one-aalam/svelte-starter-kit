import type { SvelteComponentTyped, SvelteComponent } from 'svelte'
import { writable } from 'svelte/store'

export const modals = writable<Array<{
    component: new (...args: any) => SvelteComponent,
    props?: unknown
}>>([])

export function openModal<T>(
    component: new (...args: any) => SvelteComponentTyped<T>,
    props?: Omit<T, 'isOpen'>,
    options?: {
      replace?: boolean
    }
  ): void {

    modals.update((prev) => [ ...(options?.replace ? prev.slice(0, prev.length - 1) : prev), { component, props }])
}

export const closeModal = () =>  pop(1)
export const closeAllModals = () =>  modals.set([])


function pop(amount = 1) {
    modals.update((prev) => prev.slice(0, Math.max(0, prev.length - amount)))
}
