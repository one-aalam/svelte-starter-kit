import type { CookieSerializeOptions } from 'cookie';
// Page Routes
export const ROUTE_HOME = '/';
export const ROUTE_AUTH = '/auth';
export const ROUTE_PROFILE = '/profile';

// API Routes
export const API_AUTH = '/api/auth.json';

// Default payload/responses
export const RESP_USER_GUEST = {
	guest: true
};

// 3rd Party Website/App URIs

export const URL_DICEBEAR = 'https://avatars.dicebear.com/api/avataaars/';

export const COOKIE_NAME = 'sb:token';
export const COOKIE_OPTIONS: CookieSerializeOptions = {
	maxAge: 60 * 60 * 24 * 7,
	domain: '',
	path: '/',
	sameSite: 'lax',
	httpOnly: true
};
