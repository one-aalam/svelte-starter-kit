import { readable } from 'svelte/store'
import { auth } from '$lib/supabase'


export const user = readable(auth.user(), set => {
    auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_IN') {
            set(session.user)
        }
        if (event == 'SIGNED_OUT') {
            set(null)
        }
    })
})
