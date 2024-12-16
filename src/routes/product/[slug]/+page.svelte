<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_PROTO_DOMAIN } from '$env/static/public';
	import chevronLeft from '$lib/assets/chevron-left.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Social from '$lib/components/Social.svelte';
	import type { Product } from '$lib/productItems';
	export let data: { product: Product };
	export const product = data.product;
	export const ogImageFullUrl = PUBLIC_PROTO_DOMAIN + product.photoHref;
	const infoInline = product.info.join(', ');
	export const descriptionWithInfo = product.description + ` (${infoInline})`;
	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname ?? previousPage;
	});
</script>

<svelte:head>
	<title>{product.name}</title>
	<meta name="description" content={descriptionWithInfo} />
	<meta property="og:title" content={product.name} />
	<meta property="og:description" content={descriptionWithInfo} />
	<meta property="og:type" content="food" />
	<meta property="og:url" content={PUBLIC_PROTO_DOMAIN} />
	<meta property="og:image" content={ogImageFullUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@skating.id" />
	<meta name="twitter:creator" content="@skating.id" />
	<meta name="twitter:title" content={product.name} />
	<meta name="twitter:description" content={descriptionWithInfo} />
	<meta name="twitter:image" content={ogImageFullUrl} />
	<link rel="canonical" href={PUBLIC_PROTO_DOMAIN + page.url.pathname} />
</svelte:head>

<div class="w-full md:max-w-[600px] 2xl:max-w-[800px] mx-auto relative">
	<img
		class="lg:rounded-lg"
		src={product.photoHref}
		title={product.name}
		alt={product.name}
		width="800"
		height="800"
		loading="lazy"
	/>
	<a
		href="/"
		class="absolute block top-4 left-4 bg-white bg-opacity-90 active:scale-90 transition-transform rounded-full w-[30px] h-[30px] pt-[5px] pl-[4px] cursor-pointer"
		on:click={(e) => {
			console.log({ previousPage, base });
			if (previousPage === '/') {
				e.preventDefault();
				window.history.back();
			}
		}}
	>
		<img src={chevronLeft} alt="Home" title="Home" width="20" height="20" loading="lazy" />
	</a>
	<div class="px-6 md:px-0">
		<h1 class="text-xl mt-4">{product.name}</h1>
		<ul class="flex mt-2 text-xs text-black dark:text-[#d5d6d7]">
			{#each product.info as info}
				<li class="mr-4 flex items-center">{info}</li>
			{/each}
		</ul>
		<p class="py-2 text-[#95979a]">
			{product.description}
		</p>
		<h2 class="lg:mb-3 lg:mr-1 min-w-[100px]">Order now:</h2>
		<div class="flex flex-wrap mt-3 lg:mt-0">
			<Social />
		</div>
	</div>
</div>
<Footer />
