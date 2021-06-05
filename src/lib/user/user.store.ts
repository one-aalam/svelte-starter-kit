import { readable } from 'svelte/store'
import { supabaseClient } from '$lib/supabase'


export const user = readable(supabaseClient.auth.user(), set => {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_OUT') {
            set(null)
        }
    })
})
