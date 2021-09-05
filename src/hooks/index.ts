import type{ Request } from '@sveltejs/kit'
import { auth } from '$lib/supabase'
import { expressifyReq, expressifyResp, deExpressifyResp } from '$lib/utils'
import { API_AUTH, RESP_USER_GUEST} from '$lib/constants'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }: { request: Request, resolve: (request: Request) => Response | Promise<Response> }) {
    // populate the `user` object for all the calls
    request.locals.user = await (await auth.api.getUserByCookie(expressifyReq(request))).user || RESP_USER_GUEST // Converts request to have `req.headers.cookie` on `req.cookies, as `getUserByCookie` expects parsed cookies on `req.cookies`
    // prepare response
	let response = await resolve(request);
    // Set/Reset authentication cookies for Supabase, when user signs in or signs out
    if (request.method === 'POST' && request.path === API_AUTH) {
        auth.api.setAuthCookie(request, expressifyResp(response)) // Converts `response` to express compatible format, which Supabase expects for setting headers
        response = deExpressifyResp(response) // Converts response back to its original format
    }

	return {
		...response,
		headers: {
			...response.headers,
			'x-custom-header': 'svelte-starter-kit'
		}
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(request: Request) {
    const { user } = request.locals
    // only include the properties that are needed client-side — exclude anything else attached to the user like access tokens etc
    // we know that the `user` object won't have anything sensitive so we're making the entire `user` object available
    // Note: `getSession` runs only when SvelteKit server-renders a page, not for the API handlers.
	return {
		user
	};
}
