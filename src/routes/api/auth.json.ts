
import type{ RequestEvent } from '@sveltejs/kit'
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post(event: RequestEvent /*, res: Response (read the notes below) */) {
    // Unlike, Next.js API handlers you don't get the response object here. As a result, you cannot invoke the below method to set cookies on the responses.
    // await supabaseClient.auth.api.setAuthCookie(req, res);
    // `supabaseClient.auth.api.setAuthCookie(req, res)` is dependent on both the request and the responses
    // `req` used to perform few validations before setting the cookies
    // `res` is used for obviously setting the cookies
    return {
        status: 200,
        body: null
    }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ locals }) {
    const { user } = locals // refer hooks to see how this got populated
    return {
        body: {
            user
        }
    }
}
