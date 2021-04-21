
import type{ Request, Response } from '@sveltejs/kit'
import { supabaseClient } from '$lib/supabase';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post(req: Request, res: Response) {
    await supabaseClient.auth.api.setAuthCookie(req, res);
    return {
        status: 200,
        body: null
    }
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(req: Request, res: Response) {
    const { user } = await supabaseClient.auth.api.getUserByCookie(req);
    return {
        body: {
            user
        }
    }
}
