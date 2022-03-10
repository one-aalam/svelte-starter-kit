<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import {
		siteSeoBase,
		siteSeoOpenGraphBase,
		siteSeoOpenGraphArticle,
		siteSeoTwitter
	} from '../config';

	export let title = '';
	export let description = '';

	export let ogUrl = '';
	export let article: typeof siteSeoOpenGraphArticle.article = null;
	export let twitter: typeof siteSeoTwitter = null;
</script>

<SvelteSeo
	title={title ? `${siteSeoBase.title} | ${title}` : siteSeoBase.title}
	description={description || siteSeoBase.description}
	keywords={siteSeoBase.keywords}
	canonical={siteSeoBase.canonical + ''}
	openGraph={{
		...siteSeoOpenGraphBase,
		type: article ? siteSeoOpenGraphArticle.type : siteSeoOpenGraphBase.type,
		url: ogUrl || siteSeoOpenGraphBase.url + '',
		...(article ? { article: { ...siteSeoOpenGraphArticle.article, ...article } } : null)
	}}
	twitter={twitter ? { ...siteSeoTwitter, ...twitter } : null}
/>
