import { readable } from 'svelte/store'
import { auth } from '$lib/supabase'
import { setServerSessionAndRedir } from '$lib/user'

export const user = readable(auth.user(), set => {
    auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_IN') {
            set(session.user)
            setServerSessionAndRedir(session)
        }
        if (event == 'SIGNED_OUT') {
            set(null)
        }
    })
})
