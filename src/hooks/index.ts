import type{ Incoming } from '@sveltejs/kit'
import { auth } from '$lib/supabase'
import { expressifyReq, expressifyResp, deExpressifyResp } from '$lib/utils'

/** @type {import('@sveltejs/kit').GetContext} */
export async function getContext(req: Incoming) {
    const { user } = await auth.api.getUserByCookie(expressifyReq(req));
	return {
		user: user || { guest: true }
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ context }) {
    // only include the properties that are needed client-side — exclude anything else attached to the user like access tokens etc
    // we know that the `user` object won't have anything sensitive so we're making the entire `user` object available
	return {
		user: context?.user
	};
}


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {
	let response = await render(request);
    if (request.method === 'POST' && request.path === '/api/auth.json') {
        auth.api.setAuthCookie(request, expressifyResp(response))
        response = deExpressifyResp(response)
    }
	return {
		...response,
		headers: {
			...response.headers,
			'x-custom-header': 'svelte-starter-kit'
		}
	};
}
