import type{ AuthSession } from '@supabase/supabase-js'
import { goto } from '$app/navigation';
import { auth } from '$lib/supabase'
import { setAuthCookie, unsetAuthCookie } from '$lib/utils'
import { ROUTE_HOME, ROUTE_PROFILE } from '$lib/constants'

export async function signOut() {
    await auth.signOut()
    await unsetAuthCookie()
    goto(ROUTE_HOME)
}

export async function setServerSessionAndRedir(session: AuthSession) {
    await setAuthCookie(session)
    goto(ROUTE_PROFILE)
}
