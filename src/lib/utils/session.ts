
import type{ AuthChangeEvent, Session } from '@supabase/supabase-js'

export async function setServerSession(event: AuthChangeEvent, session: Session) {
    await fetch('/api/auth.json', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
    })
}

export const setAuthCookie = async (session: Session) => await setServerSession('SIGNED_IN', session)
export const unsetAuthCookie = async () => await setServerSession('SIGNED_OUT', null)
