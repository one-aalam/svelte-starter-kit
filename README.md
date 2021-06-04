# Svelte Starter Kit
Boilerplate to quckly get up and running with Svelte, with

- __Typescript__ as the language choice
- __Tailwind CSS__ for quick styling without getting out of your HTML
- __ESLint__ for static code analysis
- __Prettier__ for code formatting
- __SEO__ pre-configured
- __Icons__ support out of the box
- __Authentication__ with Supabase

and pre-made
- __Alerts__ `coz who don't uses one?
- __Modal__ as you always come back to `em
- __Menu__

## How to Setup?
If new to Supabase
- Create account at [Supabase](https://app.supabase.io/)
- Create a Organisation, and a project

Once done,
- Copy the generated project's API authentication details from `https://app.supabase.io/project/<your-awesome-svelte-project>/api/default?page=auth`
- Place the details in `.env`/`.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`</li>
- Install NPM dependencies

and get started by running `yarn dev`

## Why SvelteKit?

Landing from a different Full-stack UI framework(Next.js, NuxtJS, Angular Universal)? Here's few essential watches and readings -
- [An update on SvelteKit](https://www.youtube.com/watch?v=fnr9XWvjJHw&t=19101s) (Rich Harris on SvelteKit - SvelteSummit)
- [A short history of Svelte](https://dev.to/ajcwebdev/a-short-history-of-sveltekit-49lk)

## Why Supabase?
- https://aalam.in/blog/supabase-the-open-source-firebase-alternative (Supabase has storage now, and something better than functions could land anytime soon)

## Building

Svelte Kit apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `yarn build` will generate a Node app that you can run with `node build`. To use a different adapter, add it to the `devDependencies` in `package.json` making sure to specify the version as `next` and update your `svelte.config.cjs` to [specify your chosen adapter](https://kit.svelte.dev/docs#configuration-adapter). The following official adapters are available:

- [@sveltejs/adapter-node](https://github.com/sveltejs/kit/tree/master/packages/adapter-node)
- [@sveltejs/adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)
- [@sveltejs/adapter-netlify](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify)
- [@sveltejs/adapter-vercel](https://github.com/sveltejs/kit/tree/master/packages/adapter-vercel)
- ...more soon

[See the adapter documentation for more detail](https://kit.svelte.dev/docs#adapters)
